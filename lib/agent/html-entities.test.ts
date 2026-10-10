import { describe, expect, test } from "bun:test";
import { cleanHtmlEntities } from "./html-entities";

describe("cleanHtmlEntities", () => {
  test("decodes the BBC hex apostrophe that leaked into report titles", () => {
    expect(
      cleanHtmlEntities(
        "CJP at Jantar Mantar: &#x27;Cockroach&#x27; group says leaders detained at Delhi protest"
      )
    ).toBe(
      "CJP at Jantar Mantar: ‘Cockroach’ group says leaders detained at Delhi protest"
    );
  });

  test("decodes named, decimal, and hex entities to typographic characters", () => {
    expect(cleanHtmlEntities("&lsquo;hi&rsquo;")).toBe("‘hi’");
    expect(cleanHtmlEntities("&ldquo;quoted&rdquo;")).toBe("“quoted”");
    expect(cleanHtmlEntities("a&mdash;b&ndash;c&hellip;d")).toBe("a—b–c…d");
    expect(cleanHtmlEntities("&apos;apostrophe&apos;")).toBe("‘apostrophe’");
    expect(cleanHtmlEntities("&#8217;curly&#8217;")).toBe("’curly’");
    expect(cleanHtmlEntities("&#x2019;hex&#x2019;")).toBe("’hex’");
  });

  test("preserves the original six entities", () => {
    expect(cleanHtmlEntities("&amp;")).toBe("&");
    expect(cleanHtmlEntities("&lt;")).toBe("<");
    expect(cleanHtmlEntities("&gt;")).toBe(">");
    expect(cleanHtmlEntities("&quot;")).toBe('"');
    expect(cleanHtmlEntities("a&#39;b")).toBe("a’b");
    expect(cleanHtmlEntities("&nbsp;")).toBe(" ");
  });

  test("does not leave any entity sequence in the output", () => {
    const raw =
      "&#x27;&#39;&apos;&rsquo;&lsquo;&ldquo;&rdquo;&mdash;&ndash;&hellip;&#x2019;&#8217;&amp;";
    expect(cleanHtmlEntities(raw)).not.toMatch(/&(#\w+|[a-z]+);/i);
  });

  test("leaves unknown and malformed entities verbatim instead of dropping them", () => {
    expect(cleanHtmlEntities("&notarealentity;")).toBe("&notarealentity;");
    expect(cleanHtmlEntities("&#xZZ;")).toBe("&#xZZ;");
    expect(cleanHtmlEntities("100% & rising")).toBe("100% & rising");
    expect(cleanHtmlEntities("AT&T")).toBe("AT&T");
  });

  test("rejects out-of-range code points rather than throwing", () => {
    expect(cleanHtmlEntities("&#x110000;")).toBe("&#x110000;");
    expect(cleanHtmlEntities("&#99999999999;")).toBe("&#99999999999;");
  });

  test("decodes case-insensitively for named entities", () => {
    expect(cleanHtmlEntities("&AMP;")).toBe("&");
    expect(cleanHtmlEntities("&Rsquo;")).toBe("’");
  });

  test("distinguishes opening from closing quotes by context", () => {
    expect(cleanHtmlEntities("&#x27;Cockroach&#x27;")).toBe("‘Cockroach’");
    expect(cleanHtmlEntities("the &#39;best&#39; option")).toBe("the ‘best’ option");
    // Elisions like "rock 'n' roll" are inherently ambiguous; a post-space
    // apostrophe is treated as opening, matching standard smart-quote engines.
    expect(cleanHtmlEntities("rock &#39;n&#39; roll")).toBe("rock ‘n’ roll");
  });
});