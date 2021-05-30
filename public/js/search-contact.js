searchContact.addEventListener('keyup',() => {
    for(let i=0;i<contactList.children.length;i++){
        let contactName = contactList.children[i].children[0].innerText;
        if(!contactName.includes(searchContact.value.toLowerCase()))
            contactList.children[i].style.display = 'none'
        else
            contactList.children[i].style.display = 'block'
    }
})