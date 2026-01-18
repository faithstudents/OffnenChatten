import { supabase } from "../Supabase/supabase";

export async function signIn(username: string, password: string)
{
    // Sign In the user with their username and password
    const { error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
    });

    // Check for errors
    if (error)
    {
        throw new Error("[ERROR]: Failed to Sign In user! | ", error);
    }

    // Print success
    console.log('[LOG]: Successfully signed in user: ', username);
}
