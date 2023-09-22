'use strict';

const form = document.querySelector("form");
const formInputs = document.querySelectorAll("input[type='text']");

const cardNumber = document.querySelector(".num");
const cardName = document.querySelector(".name");
const cardMonth = document.querySelector(".month");
const cardYear = document.querySelector(".year");
const cardCVC = document.querySelector(".cvs")
const divSpan = document.querySelector(".div");


//! All Regex
const spCharReg = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
const digitRegx = /\d/;
const alpabets = /[a-zA-Z]/;
const alpabetsSpaceRegx = /^[A-Za-z\s]*\s[A-Za-z\s]*[A-Za-z\s]*$/;

//! populate UI on load event
function populateUILoad() {
    cardNumber.innerHTML = "0000 0000 0000 0000";
    cardCVC.innerHTML = "000";
    cardName.innerHTML = "jane appleseed";
    cardMonth.innerHTML = "00";
    cardYear.innerHTML = "00";
    divSpan.innerHTML = "/";
}

//! verification summary object
let verifySum = [];


//! remove error on focus
formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
        input.style.border = "1px solid hsl(279, 6%, 55%)";
        input.nextElementSibling.style.visibility = "hidden";
    })
})



function showError(input, message) {
    const errorEl = input.nextElementSibling;
    errorEl.innerHTML = `${message}`;
    input.style.border = "1px solid hsl(0, 100%, 66%)"
    errorEl.style.visibility = "visible";
}

function showSuccess(input) {
    const errorEl = input.nextElementSibling;
    input.style.border = "1px solid hsl(278, 94%, 30%)"
    errorEl.style.visibility = "hidden";
}


//! validate each input value when typing or on input event
formInputs.forEach((input) => {
    input.addEventListener("input", function (e) {
        const type = input.id;
        const value = input.value;

        if (type === "card-holder") {

            if (value != "") {
                if (/[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value)) {
                    showError(input, "only alphabets")
                } else {
                    cardName.innerHTML = input.value;
                    showSuccess(input);
                }
            } else {
                cardName.innerHTML = "jane appleseed".toUpperCase();
            }
        }

        if (type === "card-number") {
            if (value != "") {
                if (/^[A-Za-z]+$/.test(+value)) {
                    showError(input, "Only digits")
                } else {
                    let valueNow = value;
                    valueNow = valueNow.replace(/\s/g, '');
                    valueNow = valueNow.replace(/(.{4})/g, '$1 ');
                    showSuccess(input)
                    cardNumber.innerHTML = valueNow;
                    input.value = value;
                }
            } else {
                cardNumber.innerHTML = "0000 0000 0000 0000";
            }
        }

        if (type === "exp-month") {
            if (value != "") {
                if (/^[A-Za-z]+$/.test(value)) {
                    showError(input, "Only digits")
                    input.value = "";
                } else {
                    showSuccess(input)
                    cardMonth.innerHTML = input.value;
                }
            } else {
                cardMonth.innerHTML = "00";
            }
        }

        if (type === "exp-year") {
            if (value != "") {
                if (/^[A-Za-z]+$/.test(value)) {
                    showError(input, "Only digits")
                    input.value = "";
                } else {
                    showSuccess(input)
                    cardYear.innerHTML = input.value;
                }
            } else {
                cardYear.innerHTML = "00";
            }
        }


        if (type === "cvc-digit") {
            if (value != "") {

                if (/^[A-Za-z]+$/.test(value)) {

                    showError(input, "Only digits")


                    input.value = "";
                } else {
                    if (/^[A-Za-z]+$/.test(value)) {

                        showError(input, "Only digits")
                        input.value = "";
                    } else {
                        for (let i = 0; i < value.length; i++) {
                            if (isNaN(value[i])) {
                                const errMessage = "Only digits"
                                const errorEl = input.nextElementSibling;
                                errorEl.innerHTML = `${errMessage}`;
                                input.style.border = "1px solid hsl(0, 100%, 66%)"
                                errorEl.style.visibility = "visible";
                                return null;
                            } else {
                                showSuccess(input)
                                cardCVC.innerHTML = value;
                            }
                        }
                    }



                }
            } else {
                cardCVC.innerHTML = "000";
            }
        }
    })
})












//! validate card inputs on submit event
function checkValid(input) {
    const type = input.id;
    const value = input.value;

    //! check if name is valid
    if (type === "card-holder") {
        // check if name is only alphabets
        if (!alpabetsSpaceRegx.test(value)) {
            const errMessage = "Invalid name"
            showError(input, errMessage);
            pushVerifySum(type, value, 1, errMessage);

        } else {
            // check if name length is > 5 chars
            if (value.length < 5) {
                const errMessage = "Incomplete name"
                showError(input, errMessage);
                pushVerifySum(type, value, 1, errMessage);

            }

            // name input validation passed
            showSuccess(input);
            pushVerifySum(type, value, 0);

        }

    }

    //! check if card number is valid
    if (type === "card-number") {
        if (!digitRegx.test(+value)) {
            const errMessage = "Only digits"
            showError(input, errMessage);
            pushVerifySum(type, value, 1, errMessage);

        } else {
            // check if card number is valid length

            if (value.length != 16) {
                const errMessage = "Must be 16 digits"
                showError(input, errMessage);
                pushVerifySum(type, value, 1, errMessage);

            } else {
                showSuccess(input);
                pushVerifySum(type, value, 0);
            }


        }
    }

    //! validate month
    if (type === "exp-month") {
        if (!digitRegx.test(value)) {
            const errMessage = "Only digits"
            showError(input, errMessage);
            pushVerifySum(type, value, 1, errMessage);

        } else {
            const valueSum = (+value[0]) + (+value[1] ?? "");

            if (value.length != 2) {
                const errMessage = "Must be 2 digits"
                showError(input, errMessage);
                pushVerifySum(type, value, 1, errMessage);

            } else {
                if (value > 12 || valueSum <= 0) {
                    const errMessage = "Invalid month"
                    showError(input, errMessage);
                    pushVerifySum(type, value, 1, errMessage);

                } else {

                    showSuccess(input);
                    pushVerifySum(type, value, 0);
                }
            }

            // if (value > 12 || valueSum <= 0) {
            //     const errMessage = "Invalid month"
            //     showError(input, errMessage);
            //     pushVerifySum(type, value, 1, errMessage);

            // }


            // showSuccess(input);
            // pushVerifySum(type, value, 0);

        }
    }


    //! validate year
    if (type === "exp-year") {
        const valueSum = (value[0]) + (value[1] ?? "");



        // must be digits
        if (!digitRegx.test(value)) {
            const errMessage = "Only digits"
            showError(input, errMessage);
            pushVerifySum(type, value, 1, errMessage);

        } else {

            // must be 2digits
            if (value.length <= 1) {

                const errMessage = "Must be 2 digits"
                showError(input, errMessage);
                pushVerifySum(type, value, 1, errMessage);

            }

            // more than 50
            if (value > 50 || valueSum <= 22) {

                const errMessage = "Invalid year"
                showError(input, errMessage);

                pushVerifySum(type, value, 1, errMessage);

            }


            showSuccess(input);
            pushVerifySum(type, value, 0);

        }
    }

    //! validate cvc
    if (type === "cvc-digit") {
        const valueSum = (+value[0]) + (+value[1] + (+value[2]));
        // must be digits
        for (let i = 0; i < value.length; i++) {
            if (isNaN(value[i])) {
                const errMessage = "Only digits"
                const errorEl = input.nextElementSibling;
                errorEl.innerHTML = `${errMessage}`;
                input.style.border = "1px solid hsl(0, 100%, 66%)"
                errorEl.style.visibility = "visible";
                return null;
            }
        }

        if (!digitRegx.test(value)) {
            const errMessage = "Only digits"
            showError(input, errMessage);
            pushVerifySum(type, value, 1, errMessage);

        } else {

            // must be 3digits
            if (value.length > 3) {
                const errMessage = "Must be 3 digits"
                showError(input, errMessage);
                pushVerifySum(type, value, 1, errMessage);

            }
            if (valueSum <= 0) {
                const errMessage = "Invalid CVC"
                showError(input, errMessage);
                pushVerifySum(type, value, 1, errMessage);

            }

            showSuccess(input);
            pushVerifySum(type, value, 0);

        }
    }
}


function pushVerifySum(input, value, state, errorMessage = "") {
    verifySum.push({
        input_type: input,
        input_value: value,
        status: state,
        errorMessage: errorMessage
    })
}


function verifyCard(e) {
    e.preventDefault();

    formInputs.forEach((input) => {
        if (!input.value) {
            showError(input, "Can't be blank");
            return;
        } else {
            checkValid(input);
            let verificationSum = 0;
            if (verifySum.length >= 5) {
                verifySum.forEach((data) => {
                    verificationSum += data.status;
                })
                if (verificationSum === 0 && verifySum.length === 5) {
                    // console.log("form ready and all data verified")
                    console.log(verifySum);
                } else {
                    // console.log("some error in the inputs")
                    // console.log(verifySum);
                    verifySum = [];
                }

            }
        }



    })
}
window.addEventListener("load", populateUILoad);
form.addEventListener("submit", verifyCard);

