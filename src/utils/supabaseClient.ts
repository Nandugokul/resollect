import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { toast } from "react-hot-toast";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

let supabase: SupabaseClient;
try {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL and Key are required.");
  }
  supabase = createClient(supabaseUrl, supabaseKey);
} catch (error: unknown) {
  const message =
    typeof error === "object" && error && "message" in error
      ? (error as { message: string }).message
      : "Failed to initialize Supabase client";
  toast.error(message);
  throw error;
}

export default supabase;
