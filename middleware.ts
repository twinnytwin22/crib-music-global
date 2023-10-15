import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
//import type { Database } from '@/lib/database.types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const requestOrigin = req.headers.get('origin');
  const allowedOrigins = ['https://cribnetwork.io', 'http://localhost:3000', 'https://cribmusic.xyz'];
  // Check if the request's origin is in the allowed origins list
  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    // If the origin is allowed, set the appropriate CORS headers
    res.headers.set('Access-Control-Allow-Origin', requestOrigin);
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  }

  const supabase = createMiddlewareClient({ req, res })
  await supabase.auth.getSession()
  return res
}