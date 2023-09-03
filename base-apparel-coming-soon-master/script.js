const button = document.querySelector(".click");
const emailInput = document.querySelector("#email");
const warnMsg = document.querySelector(".warning-msg");
const warnIcon = document.querySelector(".warning-icon");

// let regex = new RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');


button.addEventListener("click", function (e) {
    e.preventDefault();



    if (emailInput.value === '') {
        warnMsg.style.display = 'block';
        warnMsg.textContent = 'Please input email address';
        document.querySelector("form").style.border = '1px solid hsl(0, 93%, 68%)'
        // setTimeout(() => {
        //     warnMsg.style.display = 'none';
        // }, 3000);
    }

    if (emailInput.value !== '' && !isEmail(emailInput.value)) {
        warnIcon.style.display = warnMsg.style.display = 'block';
        warnMsg.value = 'Please provide a valid email';
        document.querySelector("form").style.border = '1px solid hsl(0, 93%, 68%)'
    }


})

emailInput.addEventListener("focus", function () {
    if (warnMsg.style.display === 'block' || warnIcon.style.display === 'block') {
        warnMsg.style.display = 'none';
        warnIcon.style.display = 'none';
        document.querySelector("form").style.border = '1px solid hsl(0, 36%, 70%)'
    }
});

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}