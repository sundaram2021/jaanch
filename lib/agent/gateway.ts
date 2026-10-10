import { createOpenAI } from "@ai-sdk/openai";

const apiKey = process.env.AI_API_KEY || process.env.VERCEL_AI_API_KEY || "";
const modelName =
  (process.env.AI_MODEL_NAME || process.env.VERCEL_AI_GATEWAY_MODEL_NAME)?.replace(
    /['"]/g,
    ""
  ) || "meta/muse-spark-1.3-contributor";

export const vercelGateway = createOpenAI({
  apiKey,
  baseURL: "https://ai-gateway.vercel.sh/v1",
});

export const defaultModel = vercelGateway(modelName);
export { modelName };

export function assertGatewayConfigured(): void {
  if (!apiKey) {
    throw new Error(
      "Missing AI_API_KEY in environment variables. Copy .env.example to .env.local and set it."
    );
  }
}
