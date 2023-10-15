
import { createClient } from '@supabase/supabase-js';
import { BrowserCookieAuthStorageAdapter } from "@supabase/auth-helpers-shared";

const authStorage = new BrowserCookieAuthStorageAdapter()

export const supabaseUrl = process.env.SUPABASE_URL 
                        || process.env.NEXT_PUBLIC_SUPABASE_URL!
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabaseSRkey = process.env.SUPABASE_SERVICE_ROLE_KEY 
                          || supabaseKey

                          export const supabaseAdmin = createClient(
                            supabaseUrl,
                            supabaseSRkey,
                              {
                                auth: {
                                //  flowType: 'pkce',
                                  storage: authStorage,
                                //  persistSession: true
                                }
                              }
                          );
