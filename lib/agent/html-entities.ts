const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "’",
  lsquo: "‘",
  ldquo: "“",
  rdquo: "”",
  mdash: "—",
  ndash: "–",
  hellip: "…",
  times: "×",
  eacute: "é",
  egrave: "è",
  agrave: "à",
  ccedil: "ç",
  uuml: "ü",
  ouml: "ö",
  auml: "ä",
  ntilde: "ñ",
};

const MAX_CODE_POINT = 0x10ffff;

function codePointToString(raw: string, radix: number, fallback: string): string {
  const code = parseInt(raw, radix);
  if (!Number.isFinite(code) || code < 0 || code > MAX_CODE_POINT) {
    return fallback;
  }
  return String.fromCodePoint(code);
}

// Single pass so decoding order cannot reintroduce nested-entity bugs.
// Handles named, decimal, and hexadecimal entities; unknown or malformed
// sequences are left verbatim rather than dropped.
// Publishers encode apostrophes as ASCII (&#x27; / &#39; / &apos;) even when
// they intend typographic quotes. An apostrophe is opening when it follows a
// boundary and closing otherwise, so 'Cockroach' becomes ‘Cockroach’.
function toSmartQuotes(str: string): string {
  return str.replace(
    /'/g,
    (match, offset: number) => {
      const before = offset > 0 ? str[offset - 1] : "";
      const isOpening =
        before === "" || /[\s(\[{—–-]/.test(before);
      return isOpening ? "‘" : "’";
    }
  );
}

export function cleanHtmlEntities(str: string): string {
  const decoded = str.replace(
    /&(#[xX][0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]*);/g,
    (match, entity: string) => {
      if (entity[0] === "#") {
        const isHex = entity[1] === "x" || entity[1] === "X";
        return codePointToString(
          isHex ? entity.slice(2) : entity.slice(1),
          isHex ? 16 : 10,
          match
        );
      }
      const replacement = NAMED_ENTITIES[entity.toLowerCase()];
      return replacement ?? match;
    }
  );
  return toSmartQuotes(decoded);
}