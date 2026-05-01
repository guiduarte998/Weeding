import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRole) {
  console.warn("Supabase environment variables missing. API routes will fail until set.");
}

export const supabaseAdmin = createClient(supabaseUrl ?? "", supabaseServiceRole ?? "", {
  auth: { persistSession: false }
});
