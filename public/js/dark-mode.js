darkModeSwitch.checked = false

darkModeSwitch.addEventListener('click',function(){
    let elementsBackgroundGray 
    let elementsBackgroundWhite
    let selectedContact

    if(darkMode){
        elementsBackgroundGray = document.querySelectorAll(".back-l-black")
        elementsBackgroundWhite = document.querySelectorAll(".back-black");
        selectedContact = document.querySelector(".selected-black")
        darkMode = false
    }else{
        elementsBackgroundGray = document.querySelectorAll(".back-gray")
        elementsBackgroundWhite = document.querySelectorAll(".back-white");
        selectedContact = document.querySelector(".selected-white")
        darkMode = true
    }

    elementsBackgroundWhite.forEach(element => {
        element.classList.toggle('back-white')
        element.classList.toggle('back-black')
    });

    elementsBackgroundGray.forEach(element => {
        element.classList.toggle('back-gray')
        element.classList.toggle('back-l-black')
    });

    selectedContact.classList.toggle('selected-white');
    selectedContact.classList.toggle('selected-black');

    const inputText = document.querySelectorAll("input[type=text]");
    inputText.forEach(input => {
        input.classList.toggle('back-ul-black')
        input.classList.toggle('border-none')
    });

})




