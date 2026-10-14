import { NextRequest, NextResponse } from "next/server";
import { logout, SESSION_COOKIE } from "@/lib/auth";
import { fail } from "@/lib/http";
export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  try {
    await logout(req);
    const response = NextResponse.json({ok:true});
    response.cookies.set(SESSION_COOKIE,"",{httpOnly:true,secure:!!process.env.VERCEL || req.nextUrl.protocol==="https:",sameSite:"strict",maxAge:0,path:"/"});
    return response;
  } catch(error) { return fail(error); }
}
