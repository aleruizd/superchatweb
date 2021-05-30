//----- NOTIFICATION COUNTER BLOCK------
const checkNotificationCounter = () => {
    notificationCounter.innerHTML = notificationList.children.length

    if(notificationList.children.length > 0)
        notificationCounter.style.display = 'flex'
    else
        notificationCounter.style.display = 'none'
}

checkNotificationCounter();
//--------------------------------------

//--- FRIEND REQUEST DESICION BLOCK ----

const appendContact = (contactData) => {
    let parser = new DOMParser();
    
    let contactTemplate = `
        <div class="contact">
            <span class="contact-name">${contactData.username}</span>
            <div class="flex align-center">
                <span class="last-message-date"></span>
                <span class="unreaded-messages-counter">0</span>
            </div>
            <input type="hidden" name="conversationId" value="${contactData.conversationId}">
        </div>`

    let contact = parser.parseFromString(contactTemplate,'text/html').body;

    contactList.append(contact.children[0]);
    
    if(darkMode)
        contactList.lastElementChild.classList.toggle("back-black")
    else
        contactList.lastElementChild.classList.toggle("back-white")
        
    contactList.lastElementChild.addEventListener("click",getConversation);
    contactList.lastElementChild.addEventListener("click",closeChatAside);
    contactList.lastElementChild.addEventListener("click",resetUnreadedMessages);
}

socket.on(`friend-request-accepted-for-${username}`,(data) => {
    appendContact(data.contact,true);
});

async function addFriend(){
    let friendRequestId = this.parentNode.nextSibling.nextSibling;
    let notification = friendRequestId.parentNode;

    config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            friendRequestId: friendRequestId.value
        }),
        cache: 'no-cache'
    }

    let response = await fetch(`${window.location.origin}/contact`,config);
    let status = JSON.parse(await response.text());

    if(status.ok){
        notificationList.removeChild(notification);
        checkNotificationCounter();
        appendContact(status.requestContact);

        socket.emit('friend-request-accepted', {
            to: status.requestContact.username,
            contact: status.myContact
        })
    }
}

async function rejectRequest(){
    let friendRequestId = this.parentNode.nextSibling.nextSibling;
    let notification = friendRequestId.parentNode;

    config = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            friendRequestId: friendRequestId.value
        }),
        cache: 'no-cache'
    }

    let response = await fetch(`${window.location.origin}/friend-request`,config);
    let status = JSON.parse(await response.text());

    if(status.ok){
        notificationList.removeChild(notification);
        checkNotificationCounter();
    }    
}

const addFriendDecisionEvent = () => {
    
    const acceptButtons = document.querySelectorAll(".notification .decision .fa-check");
    const rejectButtons = document.querySelectorAll(".notification .decision .fa-times");

    for(let i=0;i<acceptButtons.length;i++){
        acceptButtons[i].addEventListener("click", addFriend);
        rejectButtons[i].addEventListener("click", rejectRequest);
    }
}

addFriendDecisionEvent();

//--------------------------------------

//----- SEND FRIEND REQUEST BLOCK ------


const appendFriendRequest = (friendRequest) => {
    let parser = new DOMParser();
    
    let notificationTemplate = `
    <div class="notification">
        <span class="contact-name">${friendRequest.from}</span>
        <div class="decision">
            <i class="fas fa-check"></i>
            <i class="fas fa-times"></i>
        </div>
        <input type='hidden' name='_id' value=${friendRequest._id}>
    </div>`

    let notification = parser.parseFromString(notificationTemplate,'text/html');

    notificationList.innerHTML += notification.body.innerHTML;

    addFriendDecisionEvent(); //WHEN THE REQUEST ADDS ITSELF THIS EVENT GIVES IT THE TWO EVENTS
}

const showMessage = (message = '',type) => {
    let errorSpan = document.querySelector('#add-friend-form span')
    errorSpan.className = type;
    errorSpan.innerHTML = message;
}

const storeFriendRequest = async () => {
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            to: friendInput.value
        }),
        cache: 'no-cache'
    }

    let response = await fetch(`${window.location.origin}/friend-request`, config);
    let status = JSON.parse(await response.text())

    return status;
}

addFriendForm.addEventListener('submit', async(event) => {
    event.preventDefault();
    let status = await storeFriendRequest();
    
    if(status.ok){
        socket.emit('friend-request', status.friendRequest);
        showMessage(status.message,'successful-message')
        friendInput.value = '';
    }else{
        showMessage(status.message,'error-message')
    }    
})

socket.on(`friend-request-to-${username}`,(friendRequest)=>{
    appendFriendRequest(friendRequest);
    checkNotificationCounter();

    let notificationSound = new Audio('../sounds/pedo.mp3');
    notificationSound.play();
})

//--------------------------------------






