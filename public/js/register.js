const registerForm = document.querySelector("form[action='/register']");

const usernameInput = document.querySelector("form[action='/register'] input[name='username']");
const emailInput = document.querySelector("form[action='/register'] input[name='email']");
const passwordInput = document.querySelector("form[action='/register'] input[name='password']");



const resetErrors = () => {
    let inputs = document.querySelectorAll("form[action='/register'] input:not([type=submit])");
    let messages = document.querySelectorAll("form[action='/register'] span");

    for(let i=0;i<inputs.length;i++){
        messages[i].classList.add("display-none");
        inputs[i].classList.remove("input-error");
    }
}

const showErrors = (errors) => {
    Object.getOwnPropertyNames(errors).forEach(element => {
        let errorSpan = document.querySelector(`form[action='/register'] span[id='${element}'`);
        let elementInput = document.querySelector(`form[action='/register'] input[name='${element}'`);
        
        errorSpan.classList.remove("display-none");
        errorSpan.innerHTML = errors[`${element}`][0];

        elementInput.classList.add("input-error");
    });
}

registerForm.addEventListener("submit",async (event) => {
    event.preventDefault();

    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': usernameInput.value.toLowerCase(),
            'email': emailInput.value.toLowerCase(),
            'password': passwordInput.value
        }),
        cache: 'no-cache'
    }

    let response = await fetch(`${window.location.origin}/register`, config);

    let status = JSON.parse(await response.text());

    resetErrors();
    
    if(status.ok)
        window.location.replace(`${window.location.origin}/login`);
    else
        showErrors(status.errors);
})
