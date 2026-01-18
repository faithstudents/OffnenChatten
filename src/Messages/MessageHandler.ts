import { supabase } from "../Supabase/supabase";
import type { Message, User } from "./Message";


// Fetch Messages from Supabase
export class MessageHandler {
    
    async fetch(chat_id: String): Promise<Message[]> {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('chat_id', chat_id)
            .order('created_at', { ascending: false })
            .limit(50)

        if (error) {
            throw new Error('[ERROR]: Failed to fetch messages! | ', error);
        }

        // Return the fetched data
        return data as Message[];
    }


    async sendMessage(chat_id: string, sender_id: string, content: string) {
        const { data, error } = await supabase
            .from('messages')
            .insert([{ chat_id, sender_id, content }])
            .select()

        if (error) throw error;
        return data[0];
    }


    async getSenderDataById(id: string): Promise<User> {
        const { data, error } = await supabase.from('profiles').select('id, username, pfp_url').eq('id', id).single();

        if (error) {
            throw new Error('[ERROR]: Could not fetch user data by ID: ', error);
        }

        return data as User;
    }

};
