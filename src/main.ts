import { supabase } from "./Supabase/supabase";
import { ChatHandler } from "./Messages/ChatHandler";
import { createChatElement } from "./Messages/Chat";
import { createMessageElement } from "./Messages/Message";
import type { Message } from "./Messages/Message";
import { MessageHandler } from "./Messages/MessageHandler";

let activeChannel: any = null;
const messages_list = document.getElementById('messages');
const chats = await ChatHandler.prototype.fetch();
const chat_list = document.getElementById('chat_list');
const message_input = document.getElementById('message_input') as HTMLInputElement;

// Initialize the app
await checkAuth();


async function init()
{

    // Track the current active chat
    let activeChatId: string | null = null;

    chats.forEach(chat => {
        // Create a new chat element here
        const el = createChatElement(chat);

        el.addEventListener('click', async () => {
            if (messages_list) messages_list.innerText = "";        // Clear the current messages container

            const handler = new MessageHandler();
            const messages = await handler.fetch(chat.id);
            activeChatId = chat.id;

            // Render the messages
            messages.reverse().forEach(async (msg: Message) => {
                const msgEl = createMessageElement(msg);
                messages_list?.appendChild(msgEl);
            });


            // Subscribe to Realtime messages
            if (messages_list) {
                subscribeToNewMessages(chat.id, messages_list);
            }
        });

        chat_list?.appendChild(el);
    });

    // Send messages
    message_input.addEventListener('keydown', async (event: KeyboardEvent) => {
        if (event.key === 'Enter' && message_input.value.trim() !== "" && activeChatId) {
            // Get the user id based on session & if it doesn't exist return.
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            // Send the message
            const newMsgContent = message_input.value.trim();       // Get the value of the input (the message content)
            const handler = new MessageHandler();
            await handler.sendMessage(activeChatId, session.user.id, newMsgContent);
            message_input.value = "";                               // Clear the input bar for clean UX
        }
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

async function subscribeToNewMessages(chat_id: string, container: HTMLElement) {
    // If we are already listening to a chat, hang up first!
    if (activeChannel) {
        await supabase.removeChannel(activeChannel);
    }

    activeChannel = supabase
        .channel(`chat-${chat_id}`)
        .on(
            `postgres_changes`,
            {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `chat_id=eq.${chat_id}`         // Only tell me about messages from this chat
            },
            (payload) => {
                // Convert the raw DB data into an HTML UI Element
                const msgEl = createMessageElement(payload.new as Message);
                container?.appendChild(msgEl);

                // Scroll to the bottom so the user can see it
                // container?.scrollIntoView({ behavior: "smooth" });
            }
        )
        .subscribe((status) => {
            console.log("Realtime Status:", status);
            if (status === 'CHANNEL_ERROR') {
                console.error("Realtime failed to connect. Check your DB permissions!");
            }
        });
}
