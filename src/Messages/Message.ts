import { MessageHandler } from "./MessageHandler";

export type Message = {
    id: string,
    chat_id: string,
    sender_id: string,
    content: string,
    created_at: Date,
};

export type User = {
    id: string,
    username: string,
    pfp_url: string
};
export const userCache: Record<string, User> = {};


export function createMessageElement(message: Message) {

    const el = document.createElement('li');
    el.style.display = 'flex';
    el.style.gap = '8px';

    // Container
    const text_container = document.createElement('div');
    text_container.style.display = 'flex';
    text_container.style.flexDirection = 'column';

    // User PFP
    const pfp = document.createElement('img');
    pfp.style.width = pfp.style.height = '40px';
    pfp.style.borderRadius = '50%';
    
    // Username
    const username = document.createElement('h3');
    username.innerText = "Loading...";

    getUser(message.sender_id).then((user) => {
        username.innerText = user.username;
        if (user.pfp_url) {
            pfp.src = user.pfp_url;
        }
    });

    // Message Content
    const content = document.createElement('p');
    content.innerText = message.content;

    text_container.appendChild(username);
    text_container.appendChild(content);
    el.appendChild(pfp);
    el.appendChild(text_container);
    return el;

}


async function getUser(id: string): Promise<User> {
    // Check cache first
    if (userCache[id]) return userCache[id];

    // Fetch the whole object once
    const handler = new MessageHandler();
    const userData = await handler.getSenderDataById(id);

    // Store the data for next time
    userCache[id] = userData;

    return userData;
}
