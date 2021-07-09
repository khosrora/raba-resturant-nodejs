const seePass = document.querySelector(".see_password")
const showHide = () => {
    if (passwordRegister.type === "password") {
        passwordRegister.setAttribute("type", "text");
    } else {
        passwordRegister.setAttribute("type", "password");
    }
}

// register Form
const formRegister = document.getElementById("formRegister");
const fullnameRegister = document.getElementById("fullnameRegister");
const emailRegister = document.getElementById("emailRegister");
const phoneRegister = document.getElementById("phoneRegister");
const passwordRegister = document.getElementById("passwordRegister");
const passwordConfirmRegister = document.getElementById("passwordConfirmRegister");
// register Form
formRegister.addEventListener("submit", e => {
    e.preventDefault();
    checkInputRegister();
})

const checkInputRegister = () => {
    const fullnameValue = fullnameRegister.value.trim();
    const emailValue = emailRegister.value.trim();
    const phoneValue = phoneRegister.value.trim();
    const passwordValue = passwordRegister.value.trim();
    const passwordConfirmValue = passwordConfirmRegister.value.trim();

    if (fullnameValue === '') {
        return error(fullnameRegister, "لطفا نام و نام خانوادگی خود را وارد کنید");
    } else {
        success(fullnameRegister);
        resetError(fullnameRegister)
    }
    if (emailValue === '') {
        return error(emailRegister, "لطفا پست الکترونیک خود را وارد کنید");
    } else {
        success(emailRegister);
        resetError(emailRegister)
    }
    if (phoneValue === '') {
        return error(phoneRegister, "لطفا شماره تماس خود را وارد کنید");
    } else {
        success(phoneRegister);
        resetError(phoneRegister)
    }
    if (passwordValue.length < 8) {
        return error(passwordRegister, "دوست من کلمه عبور خود را بیشتر از 8 کاراکتر انتخاب کن");
    } else {
        success(passwordRegister);
        resetError(passwordRegister)
    }

    if (passwordConfirmValue === '') {
        return error(passwordConfirmRegister, "لطفا تایید کلمه عبور  را وارد کنید");
    } else if (passwordValue !== passwordConfirmValue) {
        return error(passwordConfirmRegister, "کلمه عبور و تایید کلمه عبور یکسان نیستند");
    } else {
        success(passwordConfirmRegister);
        resetError(passwordConfirmRegister)
    }

    formRegister.submit();
}


const error = (input, message) => {
    const formControll = input.parentElement;
    const span = formControll.querySelector("span")
    span.style = "color : #f14545"
    span.innerHTML = message;
    input.style = "border-color : #f14545"
}

const success = (input) => {
    input.style = "border-color : #43cc5a"
}

const resetError = (input) => {
    const formControll = input.parentElement;
    const span = formControll.querySelector("span")
    span.style = "display : none"
}

