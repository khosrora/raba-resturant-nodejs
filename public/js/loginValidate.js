

// login Form
const formLogin = document.getElementById("formLogin");
const emailLogin = document.getElementById("emailLogin");
const passwordLogin = document.getElementById("passwordLogin");
// login Form

formLogin.addEventListener("submit", e => {
    e.preventDefault();
    checkInputLogin();
})



const checkInputLogin = () => {
    const emailValue = emailLogin.value.trim();
    const passwordValue = passwordLogin.value.trim();

    if (emailValue === '') {
        return error(emailLogin, "لطفا پست الکترونیک خود را وارد کنید");

    } else {
        success(emailLogin);
        resetError(emailLogin)
    }
    if (passwordValue.length < 8) {
        return error(passwordLogin, "دوست من کلمه عبور خود را بیشتر از 8  کاراکتر انتخاب کن")
    } else {
        success(passwordLogin)
        resetError(passwordLogin)
    }
    formLogin.submit();
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


