
// CONTACT FORM
// Mobile Form verificaton
function verifyContact(e) {
    e.preventDefault();
    const teamName = document.getElementById("team")
    const topic = document.getElementById("topic")
    const email = document.getElementById("m-email")
    const mobileMessage = document.getElementById("m-message")


    // const values = [];
    const allDiv = [teamName, topic, email, mobileMessage];

    allDiv.forEach((info) => {
        if (info.value === "") {
            if (info.id === "m-message") {
                const parent = info.parentElement;
                parent.style.border = "1px solid red";
            } else {
                info.style.border = "1px solid red";
                const errorM = info.nextElementSibling;
                errorM.innerHTML = "Empty value";
            }

        } else {
            // verify each input

            // verify team for only alphanumeric
            if (info.id === "team") {
                const specialCharRegex = /[!@#$%^&*]/g;
                if (specialCharRegex.test(info.value)) {
                    info.style.border = "1px solid red";
                    const errorM = info.nextElementSibling;
                    errorM.innerHTML = "only Alphabet and Digits";
                } else {
                    info.style.border = "1px solid white";
                    const errorM = info.nextElementSibling;
                    errorM.innerHTML = "";
                }

            }

            // verify topic name for only alphabet
            if (info.id === "topic") {
                const charDigi = /[!@#$%^&*\d]/g;
                if (charDigi.test(info.value)) {
                    info.style.border = "1px solid red";
                    const errorM = info.nextElementSibling;
                    errorM.innerHTML = "only Alphabet";
                } else {
                    info.style.border = "1px solid white";
                    const errorM = info.nextElementSibling;
                    errorM.innerHTML = "";
                }
            }

            // verify if email address is valid
            if (info.id === "m-email") {
                const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/g;
                if (emailRegex.test(info.value)) {
                    info.style.border = "1px solid white";
                    const errorM = info.nextElementSibling;
                    errorM.innerHTML = "";
                } else {
                    info.style.border = "1px solid red";
                    const errorM = info.nextElementSibling;
                    errorM.innerHTML = "Invalid Email";
                }
            }

            // simple verify for not empty
            if (info.id === "m-message") {
                if (info.value != "") {
                    info.parentElement.style.border = "1px solid white";
                }
            }
        }
    })
    // values.push(`${teamName.value}`, `${topic.value}`, `${email.value}`, `${mobileMessage.value}`);
    // console.log(values);
    // console.log(teamName, topic, email, mobileMessage);
}

// Desktop form verifcation
function verifyDesktopContact(e) {
    e.preventDefault();
    const name = document.getElementById("d-name")
    const email = document.getElementById("d-email")
    const message = document.getElementById("message")


    // const values = [];
    const allDiv = [name, email, message];

    allDiv.forEach((info) => {
        if (info.value === "") {
            if (info.id === "message") {
                info.style.border = "1px solid red";
            } else {
                info.style.border = "1px solid red";
                const errorM = info.nextElementSibling;
                errorM.innerHTML = "Empty value";
            }

        } else {
            // verify each input

            // verify team for only alphanumeric
            if (info.id === "d-name") {
                const charDigi = /[!@#$%^&*\d]/g;
                if (charDigi.test(info.value)) {
                    info.style.border = "1px solid red";
                    const errorM = info.nextElementSibling;
                    errorM.innerHTML = "only Alphabet";
                } else {
                    info.style.border = "1px solid white";
                    const errorM = info.nextElementSibling;
                    errorM.innerHTML = "";
                }

            }


            // verify if email address is valid
            if (info.id === "d-email") {
                const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/g;
                if (emailRegex.test(info.value)) {
                    info.style.border = "1px solid white";
                    const errorM = info.nextElementSibling;
                    errorM.innerHTML = "";
                } else {
                    info.style.border = "1px solid red";
                    const errorM = info.nextElementSibling;
                    errorM.innerHTML = "Invalid Email";
                }
            }

            // simple verify for not empty
            if (info.id === "message") {
                if (info.value != "") {
                    info.style.border = "1px solid white";
                }
            }
        }
    })
}


mobileForm.addEventListener("submit", verifyContact)
desktopForm.addEventListener("submit", verifyDesktopContact)
// CONTACT END //