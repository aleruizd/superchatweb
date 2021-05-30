//------ LAST MESSAGE -------

const updateLastMessage = (contactUsername,date) => {
    contact = document.querySelectorAll(".contact");
    let contactElement;
    let dateHourMinutes = new Date(date).toTimeString().substring(0, 5);

    contact.forEach(actualContact => {
        if(actualContact.firstElementChild.innerText == contactUsername){
            if(actualContact != contact[0]){
                contactElement = actualContact;
                actualContact.remove();
                contactList.insertBefore(contactElement,contactList.firstElementChild);
            }
            actualContact.querySelector("span[class=last-message-date]").innerText = dateHourMinutes;
        }
    });
}

//---------------------------

const haveConversations = () => {
    if(contactList.children.length > 0)
        return true
}

const openFirstConversation = () => {
    contactList.firstElementChild.dispatchEvent(new Event('click'))
}

const messageBelongsActualConversation = (actualConversation,message) => {
    let authorFound = actualConversation.members.find(member => member == message.author);
    let toFound = actualConversation.members.find(member => member == message.to);

    if(authorFound && toFound) return true
}

const appendNewMessage = (message,owner,newMessage = false) => {
    let messageDiv = document.createElement('div');
    messageDiv.className = `${owner}`;
    let messageText = document.createElement('span');
    messageText.appendChild(document.createTextNode(`${message}`));
    messageDiv.appendChild(messageText);

    if(owner == 'contact-message'){
        if(darkMode)
            messageDiv.classList.toggle("back-black")
        else
            messageDiv.classList.toggle("back-white")
    }

    messageList.appendChild(messageDiv);
    messageList.scrollTo(0,messageList.scrollHeight);
    if(owner == 'own-message')
        messageInputArea.elements['message'].value = '';
}

const selectContact = (selected) => {
    contact.forEach(contact => {
        if(darkMode)
            contact.classList.remove("selected-black")
        else
            contact.classList.remove("selected-white")
    });

    if(darkMode)
        selected.classList.add("selected-black")
    else
        selected.classList.add("selected-white")
}

const sendMessage = async (event) => {
    event.preventDefault();
    
    let message = messageInputArea.elements['message'].value;

    if(message == '') return
    
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message,
            actualConversation
        }),
        cache: 'no-cache'
    }

    let response = await fetch(`${window.location.origin}/message`,config);
    let status = JSON.parse(await response.text());

    if(status.ok){
        let newMessageSound = new Audio('../sounds/sending-message.mp3');
        newMessageSound.play();

        appendNewMessage(message,'own-message',true);
        updateLastMessage(status.message.to,status.message.date);
        socket.emit('message',status.message);
    }
}

const openConversation = (conversation,myUsername) => {
    messageList.innerHTML = '';

    conversation.messages.forEach(message => {
        if(message.author == myUsername)
            appendNewMessage(message.body,'own-message')
        else
            appendNewMessage(message.body,'contact-message')
    });
}

async function getConversation(){
    messageInputArea.style.display = 'flex'
    selectContact(this);
    let conversationId = this.lastElementChild.value;

    let response = await fetch(`${window.location.origin}/conversation/${conversationId}`);
    let status = JSON.parse(await response.text());

    if(status.ok){
        actualConversation = status.conversation;
        openConversation(actualConversation,status.myUsername);
    }
}

contact.forEach(contact => contact.addEventListener("click",getConversation));
messageInputArea.addEventListener('submit',sendMessage);

socket.on(`message-to-${username}`,(message)=>{
    let newMessageSound;

    if(messageBelongsActualConversation(actualConversation,message)){
        appendNewMessage(message.body,'contact-message',true);
        newMessageSound = new Audio('../sounds/new-message2.mp3');
    }else{
        incrementUnreadedMessages(message.author);
        newMessageSound = new Audio('../sounds/new-message.mp3');
    }

    newMessageSound.play();
    updateLastMessage(message.author,message.date);
})

if(!haveConversations()){
    messageInputArea.style.display = 'none'
}else{
    openFirstConversation();
}

