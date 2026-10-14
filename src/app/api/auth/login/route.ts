import { NextRequest, NextResponse } from "next/server";
import { login, SESSION_COOKIE, SESSION_SECONDS } from "@/lib/auth";
import { fail } from "@/lib/http";
export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  try {
    if (Number(req.headers.get("content-length")) > 4096) return fail(new Error("That sign-in request is too large."));
    const {username,password} = await req.json();
    const result = await login(req,username,password);
    const response = NextResponse.json({ok:true,profile:result.profile}, {headers:{"Cache-Control":"no-store"}});
    response.cookies.set(SESSION_COOKIE,result.token,{httpOnly:true,secure:!!process.env.VERCEL || req.nextUrl.protocol==="https:",sameSite:"strict",maxAge:SESSION_SECONDS,path:"/"});
    return response;
  } catch(error) { return fail(error); }
}
