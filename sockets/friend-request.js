const onFriendRequest = (io,socket) => {
    socket.on('friend-request', (friendRequest)=>{
        io.emit(`friend-request-to-${friendRequest.to}`, friendRequest);
    })
}

const onFriendRequestAccepted = (io,socket) => {
    socket.on('friend-request-accepted',(data)=>{
        io.emit(`friend-request-accepted-for-${data.to}`,{
            contact: data.contact
        })
    })
}

module.exports = {
    onFriendRequest,
    onFriendRequestAccepted
}