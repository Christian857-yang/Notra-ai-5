// Model configuration for consistent use across frontend and backend

export type ModelKey = "gpt-4o-mini" | "gpt-4o" | "gpt-5.1";

export const MODEL_LABELS: Record<ModelKey, string> = {
  "gpt-4o-mini": "GPT-4o-mini",
  "gpt-4o": "GPT-4o",
  "gpt-5.1": "GPT-5.1",
};

export const PRO_ONLY_MODELS: ModelKey[] = ["gpt-4o", "gpt-5.1"];

// Check if a model requires Pro plan
export function isProOnlyModel(model: ModelKey): boolean {
  return PRO_ONLY_MODELS.includes(model);
}
