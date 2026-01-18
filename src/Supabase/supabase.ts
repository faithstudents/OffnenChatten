import { createClient } from "@supabase/supabase-js";


// Get the values of the Supabase URL/Anon Key
const Supabase_URL = import.meta.env.VITE_SUPABASE_URL;
const Supabase_Anon_Key = import.meta.env.VITE_SUPABASE_ANON_KEY;


// Check to make sure the URL and Key are not Null, and then create the new Supabase client
if (!Supabase_URL || !Supabase_Anon_Key)
{
    throw new Error("[ERROR]: Failed to connect to Supabase!");
}

export const supabase = createClient(Supabase_URL, Supabase_Anon_Key);
