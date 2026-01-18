export type Chat = {
    id: string,
    type: string,
    name: string,
    created_at: Date,
    chat_icon: string | null,
    description: string,
};


export function createChatElement(chat: Chat) {
    const container = document.createElement('div');
    container.className = 'nav-item-container';

    const btn = document.createElement('button');
    btn.className = 'nav-icon-btn';
    
    const imageEl = document.createElement('img');
    imageEl.src = chat.chat_icon ?? "https://via.placeholder.com/40";
    
    // Create the Tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'nav-tooltip';
    tooltip.innerText = chat.name;

    btn.appendChild(imageEl);
    container.appendChild(btn);
    container.appendChild(tooltip); // Tooltip is a sibling to the button

    return container;
}
