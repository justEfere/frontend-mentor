'use strict';

const form = document.querySelector("form");
const firstname = document.querySelector('[name="firstname"]')
const lastname = document.querySelector('[name="lastname"]')
const email = document.querySelector('[name="email"]')
const password = document.querySelector('[name="password"]')



function isEmpty() {
    return;
}

[firstname, lastname, email, password].forEach((item) => {
    item.addEventListener("focus", removeError);
});

function validateNames(item) {
    const regEx = /^[a-zA-Z]+$/;
    if (regEx.test(item.value)) {
        if (item.value.length < 2) {
            showError(item, `${item.name} not valid`)
        } else {
            success(item)
        }
    } else {
        showError(item, `${item.name} is not valid`);
    }
}

function validatePassword(item) {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;


    if (item.value.length < 8) {
        showError(item, `atleast 8 chars`)
    }
    if (!uppercaseRegex.test(item.value)) {
        showError(item, "Contains at least one uppercase letter")
    }
    if (!lowercaseRegex.test(item.value)) {
        showError(item, "Contains at least one lowercase letter")
    }
    if (!digitRegex.test(item.value)) {
        showError(item, "Contains at least one digit")
    }
    if (!specialCharRegex.test(item.value)) {
        showError(item, "Allows special characters");
    }

}


function validate(e) {
    e.preventDefault();
    [firstname, lastname, email, password].forEach((item) => {
        if (item.value === "") {
            showError(item, `${item.name} cannot be empty`)
        } else {
            if (item.type === "email") {
                if (!isValidEmail(item.value)) {
                    showError(item, `${item.name} is invalid`)
                } else {
                    success(item)
                }
            } else {
                success(item)
            }

            if (item.name === "firstname" || item.name === "lastname") {
                validateNames(item);
            }

            if (item.name === "password") {
                validatePassword(item);
            }

        }
    });
}

function isValidEmail(email) {
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

function showError(item, message) {
    const warning = item.nextElementSibling;
    const formGroup = item.parentElement;
    const span = item.nextElementSibling.nextElementSibling;
    formGroup.style.border = "1px solid hsl(0, 100%, 74%)"
    span.style.visibility = "visible";
    warning.style.visibility = "visible"
    span.innerHTML = message;
}


function removeError(item) {
    const warning = item.target.nextElementSibling;
    const formGroup = item.target.parentElement;
    const span = item.target.nextElementSibling.nextElementSibling;
    warning.style.visibility = "hidden"
    formGroup.style.border = "1px solid hsl(246, 25%, 77%)";
    span.style.visibility = "hidden";
}

function success(item) {
    const formGroup = item.parentElement;
    formGroup.style.border = "1px solid hsl(154, 59%, 51%)"
}

// function removeSuccess(item) {
//     const formGroup = item.target.parentElement;
//     formGroup.style.borderColor = "1px solid hsl(246, 25%, 77%)";
// }

form.addEventListener("submit", validate);