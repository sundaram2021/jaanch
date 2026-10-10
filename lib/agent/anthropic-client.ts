import { createAnthropic } from "@ai-sdk/anthropic";

const apiKey = process.env.AI_API_KEY || "";
const modelName =
  process.env.AI_MODEL_NAME?.replace(/['"]/g, "") || "claude-haiku-5-5";

export const anthropic = createAnthropic({ apiKey });

export const defaultModel = anthropic(modelName);
export { modelName };

export function assertModelConfigured(): void {
  if (!apiKey) {
    throw new Error(
      "Missing AI_API_KEY in environment variables. Copy .env.example to .env.local and set it."
    );
  }
}