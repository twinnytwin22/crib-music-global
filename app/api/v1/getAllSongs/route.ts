import { NextResponse } from "next/server";


export const revalidate = 0;
//export const dynamic = 'force-dynamic'
import { supabaseAdmin } from "@/lib/site/constants";
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
          return  NextResponse.json(response);
        }
        } catch (error) {
          console.error("Error fetching metadata:", error);
          return NextResponse.json("Error: fetching metadata");
        }

        return NextResponse.json('Error: Method not found')
      }


