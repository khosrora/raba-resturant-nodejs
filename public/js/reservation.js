

// reservation
const formreservation = document.getElementById("reservation");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const phone2 = document.getElementById("phone2");
const time = document.getElementById("time");
const number = document.getElementById("number");
// reservation

formreservation.addEventListener("submit", e => {
    e.preventDefault();
    checkInputreservation();
})




const checkInputreservation = () => {
    const fullnameValue = fullname.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const phone2Value = phone2.value.trim();
    const timeValue = time.value.trim();
    const numberValue = number.value.trim();

    if (fullnameValue === '') {
        return error(fullname, "لطفا نام و نام خانوادگی خود را وارد کنید");
    } else {
        success(fullname);
        resetError(fullname)
    }
    if (emailValue === '') {
        return error(email, "لطفا پست الکترونیک خود را وارد کنید");
    } else {
        success(email);
        resetError(email)
    }

    if (phoneValue === '') {
        return error(phone, "لطفا شماره تماس خود را وارد کنید");
    } else {
        success(phone);
        resetError(phone)
    }
   
    if (timeValue === '') {
        return error(time, "لطفا زمان مورد نظر خود را وارد کنید");
    } else {
        success(time);
        resetError(time)
    }
    if (numberValue === '') {
        return error(number, "لطفا تعداد افراد را وارد کنید");
    } else {
        success(number);
        resetError(number)
    }

    formreservation.submit();
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


