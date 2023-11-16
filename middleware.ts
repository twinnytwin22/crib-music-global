import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { Ratelimit } from "@upstash/ratelimit";
import { ipAddress } from "@vercel/edge";
import { kv } from "@vercel/kv";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(5, "10 s"),
});

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
//import type { Database } from '@/lib/database.types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  if (req.method === "OPTIONS") {
    return NextResponse.json({}, { headers: corsHeaders });
  }
  const ip = ipAddress(req) || "127.0.0.1";

  const { success, pending, limit, reset, remaining } =
    await ratelimit.limit(ip);
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();

  // if (req.url.startsWith('/music' || 'music')){
  //   return success
  // //    ? res
  //     : Response.redirect(new URL('/music?rateLimit=reached', req.url))
  // }

  return res;
}
