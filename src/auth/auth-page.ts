// src/auth-page.ts
import { supabase } from "../Supabase/supabase";

const loginForm = document.getElementById('login-form');

loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        document.getElementById('error-msg')!.innerText = error.message;
    } else {
        // SUCCESS: Redirect to your main chat page
        window.location.href = "/index.html";
    }
});
