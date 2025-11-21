// Lightweight usage tracking
// 🚧 Currently uses in-memory Map for development
// In production, this should be replaced with a real database (Prisma, Supabase, etc.)

type UsageScope = "file" | "audio" | "video" | "chat";

// In-memory store (development only)
// In production, replace with database queries
const usageStore = new Map<string, number>();

/**
 * Increment usage count for a specific scope and period
 * @param scope - "file" | "audio" | "video" | "chat"
 * @param periodKey - Format: "YYYY-MM" for monthly, "YYYY-MM-DD" for daily
 * @param delta - Amount to increment (default: 1)
 */
export async function incrementUsage(
  scope: UsageScope,
  periodKey: string,
  delta: number = 1
): Promise<void> {
  const key = `${scope}:${periodKey}`;
  const current = usageStore.get(key) ?? 0;
  usageStore.set(key, current + delta);
}

/**
 * Get usage count for a specific scope and period
 * @param scope - "file" | "audio" | "video" | "chat"
 * @param periodKey - Format: "YYYY-MM" for monthly, "YYYY-MM-DD" for daily
 * @returns Current usage count
 */
export async function getUsage(scope: UsageScope, periodKey: string): Promise<number> {
  const key = `${scope}:${periodKey}`;
  return usageStore.get(key) ?? 0;
}

/**
 * Get period key for monthly tracking (file, audio, video)
 * @returns Format: "YYYY-MM"
 */
export function getMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

/**
 * Get period key for daily tracking (chat)
 * @returns Format: "YYYY-MM-DD"
 */
export function getDayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

