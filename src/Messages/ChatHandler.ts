import { supabase } from "../Supabase/supabase";
import type { Chat } from "./Chat";

export class ChatHandler {
    async fetch(): Promise<Chat[]> {
        const { data, error } = await supabase.from('chats').select('*')

        if (error) {
            throw new Error('[ERROR]: Failed to fetch chats!');
        }

        return data as Chat[];
    }
};
