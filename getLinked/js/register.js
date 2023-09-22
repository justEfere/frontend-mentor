'use strict';


const regForm = document.getElementById("reg-form");
const successOverlay = document.querySelector(".success-overlay")
const backBtn = document.querySelector(".succ");


const formData = [];

function pushVerifiedData(input, value, state, errorMessage = "") {
    formData.push({
        input_type: input,
        input_value: value,
        status: state,
        errorMessage: errorMessage
    })
}

function verifyRegData(e) {
    e.preventDefault();
    // console.log("hello");


    const teamName = document.getElementById("team-name");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const topic = document.getElementById("topic");
    const category = document.getElementById("category");
    const group = document.getElementById("group");
    const legal = document.getElementById("agree");
    // const errMsg = document.querySelector(".errMsg");

    const allDiv = [teamName, phone, email, topic, category, group];

    allDiv.forEach((data) => {
        if (data.value === "") {
            data.style.border = "1px solid red";
            const errMsg = data.nextElementSibling;
            errMsg.innerHTML = "Empty value";

        } else {
            if (data.id === "team-name") {
                const specialCharRegex = /[!@#$%^&*]/g;
                if (specialCharRegex.test(data.value)) {
                    data.style.border = "1px solid red";
                    const errorM = data.nextElementSibling;
                    errorM.innerHTML = "only Alphabet and Digits";
                    pushVerifiedData(data.id, data.value, 1, "only Alphabet and Digits")

                } else {
                    data.style.border = "1px solid white";
                    const errorM = data.nextElementSibling;
                    errorM.innerHTML = "";
                    pushVerifiedData(data.id, data.value, 0)
                }
            }


            if (data.id === "phone") {
                const phoneReg = /^\d{10,11}$/
                if (phoneReg.test(data.value)) {
                    data.style.border = "1px solid white";
                    const errorM = data.nextElementSibling;
                    errorM.innerHTML = "";
                    pushVerifiedData(data.id, data.value, 0)
                } else {
                    data.style.border = "1px solid red";
                    const errorM = data.nextElementSibling;
                    errorM.innerHTML = "Invalid phone number";
                    pushVerifiedData(data.id, data.value, 1, "Invalid phone number")
                }
            }

            // verify if email address is valid
            if (data.id === "email") {
                const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/g;
                if (emailRegex.test(data.value)) {
                    data.style.border = "1px solid white";
                    const errorM = data.nextElementSibling;
                    errorM.innerHTML = "";
                    pushVerifiedData(data.id, data.value, 0)
                } else {
                    data.style.border = "1px solid red";
                    const errorM = data.nextElementSibling;
                    errorM.innerHTML = "Invalid Email";
                    pushVerifiedData(data.id, data.value, 1, "Invalid Email")
                }
            }

            // verify topic name for only alphabet
            if (data.id === "topic") {
                const charDigi = /[!@#$%^&*\d]/g;
                if (charDigi.test(data.value)) {
                    data.style.border = "1px solid red";
                    const errorM = data.nextElementSibling;
                    errorM.innerHTML = "only Alphabet";
                    pushVerifiedData(data.id, data.value, 1, "only Alphabet")
                } else {
                    data.style.border = "1px solid white";
                    const errorM = data.nextElementSibling;
                    errorM.innerHTML = "";
                    pushVerifiedData(data.id, data.value, 0)

                }
            }

            if (data.id === "category") {
                data.style.border = "1px solid white";
                const errorM = data.nextElementSibling;
                errorM.innerHTML = "";
                pushVerifiedData(data.id, data.value, 0)
            }
            if (data.id === "group") {
                data.style.border = "1px solid white";
                const errorM = data.nextElementSibling;
                errorM.innerHTML = "";
                pushVerifiedData(data.id, data.value, 0)
            }


            if (formData != "") {
                // console.log(formData)

                // check for any error
                // sum errors
                let sumError = 0;
                formData.forEach((input) => {
                    sumError += input.status;

                    // displaySuccess();
                })
                // console.log(sumError);
                let allErrorEl = [];
                if (sumError > 0) {
                    allErrorEl = formData.filter((data) => data.status = 1)
                } else {
                    if (legal.checked) {
                        // console.log(formData)
                        displaySuccess();
                        const agreeError = legal.nextElementSibling;
                        agreeError.style.color = "red";
                    } else {
                        const agreeError = legal.nextElementSibling;
                        agreeError.style.color = "red";
                        return
                    }
                }

                // console.log(allErrorEl);
            }

            // if (!legal.checked) {
            //     return
            // }

        }

    })

}

function displaySuccess() {
    successOverlay.style.display = "block";
}

function closeSuccess() {
    successOverlay.style.display = "none";
}

backBtn.addEventListener("click", closeSuccess);
successOverlay.addEventListener("click", closeSuccess);
regForm.addEventListener("submit", verifyRegData);
