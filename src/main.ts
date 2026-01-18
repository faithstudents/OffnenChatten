import { supabase } from "./Supabase/supabase";
import { ChatHandler } from "./Messages/ChatHandler";
import { createChatElement } from "./Messages/Chat";
import { createMessageElement } from "./Messages/Message";
import type { Message } from "./Messages/Message";
import { MessageHandler } from "./Messages/MessageHandler";


// Initialize the app
await checkAuth();


async function init()
{
    // Perform initialization here

    // Fetch the chats
    const chats = await ChatHandler.prototype.fetch();
    const messages_list = document.getElementById('messages');
    const chat_list = document.getElementById('chat_list');

    chats.forEach(chat => {
        // Create a new chat element here
        const el = createChatElement(chat);

        el.addEventListener('click', async () => {
            if (messages_list) messages_list.innerText = "";        // Clear the current messages container

            const handler = new MessageHandler();
            const messages = await handler.fetch(chat.id);

            // Render the messages
            messages.forEach((msg: Message) => {
                const msgEl = createMessageElement(msg);
                messages_list?.appendChild(msgEl);
            });
        });

        chat_list?.appendChild(el);
    });

}

async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
        // No user? Send them to login
        window.location.href = "/auth.html";
    } else {
        console.log("[LOG]: Authorized access for", session.user.email);
        init(); // Start your chat initialization
    }
}
