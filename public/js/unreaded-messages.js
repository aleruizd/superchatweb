const checkUnreadedMessagesCounters = () => {
    contact.forEach(contact => {
        let counter = contact.querySelector(".unreaded-messages-counter");
        if(counter.innerText != '0'){
            counter.style.display = 'flex'
        }
    })
}
//------- INCREMENT ---------
const incrementUnreadedMessagesFront = (contactName) => {
    let contactElement;
    let unreadedMesaggesCount;
    contact.forEach(contact => {
        if(contact.querySelector(".contact-name").innerText == contactName)
            contactElement = contact;
    });
    
    unreadedMesaggesCount = contactElement.querySelector(".unreaded-messages-counter");
    unreadedMesaggesCount.style.display = "flex";

    unreadedMesaggesCount.innerText = parseInt(unreadedMesaggesCount.innerText) + 1;
}

const incrementUnreadedMessagesBack = async (contactName) => {
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contactName
        }),
        cache: 'no-cache'
    }

    let response = await fetch(`${window.location.origin}/increment-unreaded-messages`,config);
    let status = JSON.parse(await response.text());
}

const incrementUnreadedMessages = (contactName) => {
    contact = document.querySelectorAll(".contact");
    
    incrementUnreadedMessagesFront(contactName);
    incrementUnreadedMessagesBack(contactName);
}
//---------------------------

//----------- RESET ---------
const resetUnreadedMessagesFront = (contactElement) => {
    contactElement.querySelector(".unreaded-messages-counter").innerText = '0';
    contactElement.querySelector(".unreaded-messages-counter").style.display = 'none';
}

const resetUnreadedMessagesBack = async (contactName) => {
    config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contactName
        }),
        cache: 'no-cache'
    }

    let response = await fetch(`${window.location.origin}/reset-unreaded-messages`,config);
    let status = JSON.parse(await response.text());
}

function resetUnreadedMessages(){
    let contactName = this.querySelector(".contact-name").innerText;
    
    resetUnreadedMessagesFront(this);
    resetUnreadedMessagesBack(contactName);
}

contact.forEach(contact => contact.addEventListener("click",resetUnreadedMessages));
//---------------------------


checkUnreadedMessagesCounters();