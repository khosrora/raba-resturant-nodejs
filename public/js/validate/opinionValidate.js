const formOpinion = document.getElementById("formOpinion");
const opinion = document.getElementById("opinion");



formOpinion.addEventListener("submit", e => {
    e.preventDefault();
    checkInputOpinion();
})

const checkInputOpinion = () => {
    const opinionValue = opinion.value.trim();

    if (opinionValue === '') {
        return error(opinion, "لطفا نظر خود را وارد کنید");
    } else {
        success(opinion);
        resetError(opinion)
    }


    formOpinion.submit();
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


