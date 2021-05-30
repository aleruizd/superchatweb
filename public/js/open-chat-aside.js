const closeChatAside = () => {
    if(chatAsideOpen){
        chatAsideButton.classList.toggle("is-active")
        chatAside.style.animationName = 'chatAsideClose'
        chatAsideOpen = false
    }
}

chatAsideButton.addEventListener("click",() => {
    chatAsideButton.classList.toggle("is-active")

    if(chatAsideOpen)
        chatAside.style.animationName = 'chatAsideClose'
    else
        chatAside.style.animationName = 'chatAsideOpen'
    
        chatAsideOpen = !chatAsideOpen
})

notificationListIcon.addEventListener('click', closeChatAside);
addFriendIcon.addEventListener('click', closeChatAside);
contact.forEach(contact => contact.addEventListener('click', closeChatAside));
