import { createClient } from "@supabase/supabase-js";

export const createSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    const missing = [];
    if (!url) missing.push("NEXT_PUBLIC_SUPABASE_URL");
    if (!anon) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
    throw new Error(
      `Missing environment variable(s): ${missing.join(", ")}.\n` +
        `Create a .env.local file at the project root and set these values.\n` +
        `See .env.example for the list of required variables.`
    );
  }

  // Use anon key for server actions and client; do not attach a dynamic Authorization header
  // unless you explicitly manage Supabase auth. This avoids requests with an invalid token.
  return createClient(url, anon);
};
