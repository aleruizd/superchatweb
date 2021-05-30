

const orderByDate = (contacts) => {

    contacts.sort((contact1,contact2) => {
        if(!contact1.lastMessageDate && contact2.lastMessageDate)
            return 1
        else if(contact1.lastMessageDate && !contact2.lastMessageDate)
            return -1

        let dateContact1 = new Date(contact1.lastMessageDate);
        let dateContact2 = new Date(contact2.lastMessageDate);

        if(dateContact1 > dateContact2)
            return -1
        else
            return 1
    })

}

module.exports = {
    orderByDate
}