import { NextResponse } from "next/server";
import { getCurrentUserPlan } from "@/lib/userPlan";
import { USAGE_LIMITS } from "@/config/usageLimits";
import { getUsage, getMonthKey, getDayKey } from "@/lib/usage";

export async function GET(req: Request) {
  try {
    const plan = getCurrentUserPlan();
    const limits = USAGE_LIMITS[plan];
    const monthKey = getMonthKey();
    const dayKey = getDayKey();

    const usage = {
      fileThisMonth: await getUsage("file", monthKey),
      audioThisMonth: await getUsage("audio", monthKey),
      videoThisMonth: await getUsage("video", monthKey),
      chatToday: await getUsage("chat", dayKey),
    };

    return NextResponse.json({
      plan,
      limits,
      usage,
    });
  } catch (error: any) {
    console.error('Usage fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch usage' },
      { status: 500 }
    );
  }
}

