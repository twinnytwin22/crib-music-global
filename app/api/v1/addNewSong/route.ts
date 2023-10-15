import { NextResponse } from "next/server";


export const revalidate = 0;
//export const dynamic = 'force-dynamic'
import { supabaseAdmin } from "@/lib/site/constants";
export async function POST(request: Request) {
const updates = await request.json()
try {
 if(request.method === 'POST') {
    const { data: song, error } = await supabaseAdmin
    .from('songs')
    .insert(updates)
    .select()
    .single()
    //.eq('student_id', userId)
   // .limit(5)
    console.log(song)

    if (error) {
      throw new Error("Error adding song");
    }    
          const response = {
             song
          };
          await new Promise((resolve) => setTimeout(resolve, 500));
          return  NextResponse.json(response);
        }
        } catch (error) {
          console.error("Error adding song:", error);
          return NextResponse.json("Error: adding song");
        }

        return NextResponse.json('Error: Method not found')
      }


