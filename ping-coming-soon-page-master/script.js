'use strict';

const email = document.querySelector("#email");
const small = document.querySelector(".error");
const form = document.querySelector("form");

function isValidEmail(email) {
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

function showError(message) {
    email.classList.add("error")
    small.classList.remove("hidden")
    small.innerHTML = message;
}

function removeError() {
    email.classList.remove("error")
    email.classList.remove("success")
    small.classList.add("hidden")
}

function validate(e) {
    e.preventDefault();
    const emailVal = email.value;
    if (emailVal === "") showError("email is required");

    if (emailVal != "") {
        if (isValidEmail(emailVal)) {
            email.classList.add("success")
        } else {
            showError("Invalid email address")
        }
    }
}


form.addEventListener("submit", validate);
email.addEventListener("focus", removeError)
