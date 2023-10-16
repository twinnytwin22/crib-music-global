import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/site/constants";
export const revalidate = 0;

export const dynamic = 'force-dynamic'
export async function GET(request: Request) {
//  const { searchParams } = new URL(request.url);
//  const userId = searchParams.get("userId");
try {
 if(request.method === 'GET') {
    const { data: songs, error } = await supabaseAdmin
    .from('songs')
    .select()
    //.eq('student_id', userId)
   // .limit(5)
    console.log(songs)

    if (error) {
      throw new Error("Error fetching drops");
    }    
          const response = {
             songs
          };
          await new Promise((resolve) => setTimeout(resolve, 500));
          return  NextResponse.json(response,{ status:200});
        }
        } catch (error) {
          console.error("Error fetching metadata:", error);
          return NextResponse.json("Error: fetching metadata",{status:400});
        }

        return NextResponse.json('Error: Method not found',{status:400})
      }


     const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      };
      
      
      export async function OPTIONS(req: NextRequest) {
        return NextResponse.json({}, { headers: corsHeaders });
      }
      