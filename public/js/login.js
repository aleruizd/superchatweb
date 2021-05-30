const loginForm = document.querySelector("form[action='/login']");

const usernameInput = document.querySelector("form[action='/login'] input[name='username']");
const passwordInput = document.querySelector("form[action='/login'] input[name='password']");

const errorSpan = document.querySelector("form[action='/login'] span");



loginForm.addEventListener("submit",async (event) => {
    event.preventDefault();

    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': usernameInput.value.toLowerCase(),
            'password': passwordInput.value
        }),
        cache: 'no-cache'
    }

    let response = await fetch(`${window.location.origin}/login`, config);

    let status = JSON.parse(await response.text());

    errorSpan.classList.add("display-none");
    
    if(status.ok){
        window.location.replace(`${window.location.origin}/chat`);
    }else{
        errorSpan.classList.remove("display-none");
        errorSpan.innerHTML = status.message;
    }
})