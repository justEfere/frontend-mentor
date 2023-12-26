const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const errorMsg = document.querySelector(".err");
const closeBtn = document.querySelectorAll(".dismiss");
const desktopSuccess = document.querySelector(".desktop_success");
const mobileSuccess = document.querySelector(".mobile_success");



form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (emailInput.value != "") {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            rErr();
            successState();
        } else {
            errState("Valid email required");
        }
    } else {
        errState("email is required");
    }
})

emailInput.addEventListener("input", (e) => {
    rErr();
})

function errState(message) {
    errorMsg.style.display = "block";
    emailInput.style.color = "var(--Tomato)";
    emailInput.style.backgroundColor = "var(--Tomato-2)";
    emailInput.style.outline = "2px solid var(--Tomato)";
    emailInput.style.border = "none";
    errorMsg.textContent = message;
}
function rErr() {
    errorMsg.style.display = "none";
    errorMsg.textContent = null;
    emailInput.style.color = "var(--Charcoal-Grey)";
    emailInput.style.backgroundColor = "var(--White)";
    emailInput.style.outline = "none";
    emailInput.style.border = "2px solid var(--Charcoal-Grey)";
}

function successState() {
    const width = window.outerWidth;
    const dEmail = document.querySelectorAll(".nEmail")
    dEmail.forEach(email => {
        email.textContent = emailInput.value;
    })

    if (width <= 599) {
        desktopSuccess.style.display = "none"
        mobileSuccess.style.display = "block"
    } else {
        mobileSuccess.style.display = "none"
        desktopSuccess.style.display = "flex"
    }

}

window.addEventListener("resize", (e) => {
    const width = window.outerWidth;
    if (width <= 599) {
        if (desktopSuccess.style.display == "flex") {
            desktopSuccess.style.display = "none"
            mobileSuccess.style.display = "block"
        }
    } else if (width >= 600) {
        if (mobileSuccess.style.display == "block") {
            mobileSuccess.style.display = "none"
            desktopSuccess.style.display = "flex"
        }
    }
})

closeBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
        mobileSuccess.style.display = "none";
        desktopSuccess.style.display = "none";
        emailInput.value = null;
    })
})