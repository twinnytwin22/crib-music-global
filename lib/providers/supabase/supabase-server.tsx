"use server";
import { Database } from "@/types/Database";
import {
  createRouteHandlerClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";
import { supabaseAdmin } from "./supabase-lib-admin";

export const createServerClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
});

export async function getSession() {
  const supabase = createServerClient();
  const { data: session } = await supabase.auth.getSession();

  return session?.session;
}

export const supabaseRouteHandler = cache(() => {
  const cookieStore = cookies();
  return createRouteHandlerClient<Database>({ cookies: () => cookieStore });
});

export const createFormType = async (newFormType: string) => {
  const { data, error } = await supabaseAdmin
    .from("form_types")
    .insert([{ type: newFormType }])
    .select()
    .maybeSingle();
  if (error) {
    console.log(error);
  }
  return data;
};

export async function getUserDetails() {
  try {
    const { data: userDetails } = await supabaseAdmin
      .from("users")
      .select("*")
      .single();
    return userDetails;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getSubscription() {
  try {
    const { data: orders } = await supabaseAdmin
      .from("license_orders")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .maybeSingle()
      .throwOnError();
    return orders;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export const getActiveProductsWithPrices = async () => {
  const { data, error } = await supabaseAdmin
    .from("licenses")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { foreignTable: "prices" });

  if (error) {
    console.log(error.message);
  }
  return data ?? [];
};
