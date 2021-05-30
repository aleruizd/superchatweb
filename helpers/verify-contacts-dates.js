/* THIS HELPERS VERIFIES IF THE DATES ARE FROM TODAY OR YESTERDAY OR OTHER DATE.
IF THE DATE IS TODAY IT WILL ONLY PUT THE HOUR OF THE DATE AND IF THE DATE IS FROM
OTHER DAY IT WILL PUT THE COMPLETE DATE*/
const verifyContactsDates = (contacts) => {
    let todaysDate = new Date(Date.now());

    contacts.forEach(contact => {
        if (contact.lastMessageDate) {
            let contactLastMessage = new Date(contact.lastMessageDate);
            if (contactLastMessage.toLocaleDateString() == todaysDate.toLocaleDateString()) {
                contact.lastMessageDate = contactLastMessage.toTimeString().substring(0, 5);
            } else {
                contact.lastMessageDate = contactLastMessage.toLocaleDateString();
            }
        }
    });
}

module.exports = {
    verifyContactsDates
}