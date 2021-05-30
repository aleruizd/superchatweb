const onMessage= (io,socket) => {
    socket.on('message', (message)=>{
        io.emit(`message-to-${message.to}`, message);
    })
}

module.exports = {
    onMessage
}