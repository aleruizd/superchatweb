require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http').createServer(app);//COMO QUE JUNTO EL SERVER DE EXPRESS CON EL DE SOCKET OI
const io = require('socket.io')(http);
const path = require('path');
const mongoose = require('mongoose');
const session =  require('express-session');
const MongoStore = require('connect-mongo')(session);
const sharedsession = require('express-socket.io-session');

const indexRouter = require('./routes/index');

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// session and mongostore config
let sessionConfig = session({
    secret: process.env.SESSION_PASS,
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly: true,
        secure: false,
        maxAge: 60000 * 60 * 24
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
})

app.use(sessionConfig);

// mongoose connection


mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// port set
app.set('port', process.env.PORT || 3000)

//socket.io
io.use(sharedsession(sessionConfig,{
    autoSave: true
}))

io.on('connection',(socket)=>{
    let {onFriendRequest, onFriendRequestAccepted} = require("./sockets/friend-request");
    let {onMessage} = require("./sockets/message");
    onFriendRequest(io,socket);
    onFriendRequestAccepted(io,socket);
    onMessage(io,socket);
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require("./routes/index"));

http.listen(app.get('port'));

module.exports = app;
