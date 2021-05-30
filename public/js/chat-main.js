let contact = document.querySelectorAll(".contact");
const searchContact = document.querySelector(".search-contact input");
const messageInputArea = document.querySelector(".message-input-area");
const messageList = document.querySelector(".messages-window");
const username = document.querySelector("#username").textContent;
const notificationList = document.querySelector(".notifications");
const notificationListIcon = document.querySelector(".fa-bell");
const contactList = document.querySelector(".contacts")
const addFriendForm = document.querySelector("#add-friend-form");
const addFriendIcon = document.querySelector(".fa-user-plus");
const friendInput = document.querySelector("#add-friend-form input[type=text]")
const notificationCounter = document.querySelector(".notification-counter")
const darkModeSwitch = document.querySelector(".switch-dark-mode input[type=checkbox]")
const chatAsideButton = document.querySelector(".hamburger")
const chatAside = document.querySelector(".chat-aside")


let darkMode = false;

let actualConversation;

let chatAsideOpen = false;

let socket = io();







