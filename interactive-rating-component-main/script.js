'use strict';

const submit = document.querySelector(".submit");
const rating = document.querySelectorAll(".rate");
const rateContent = document.querySelector(".rate-container");
const thankYou = document.querySelector(".thankyou")
const close = document.querySelector(".close")


//! functions
function findSelected(rating) {
    for (const rate of rating) {
        if (rate.classList.contains("active")) {
            return rate.innerHTML;
        }
    }
    return null;
}

function selector(e) {
    const selected = e.target;
    removeActive(rating);
    selected.classList.add("active")
}

function removeActive(rating) {
    rating.forEach((rate) => {
        if (rate.classList.contains("active")) {
            rate.classList.remove("active")
        }
    })
}

function addRate(value) {
    const p = document.querySelector(".selected");
    p.textContent = `You selected ${value} out of ${rating.length}`
}

function rated(e) {
    const value = findSelected(rating);
    if (!value) return;

    rateContent.classList.add("hidden");

    thankYou.classList.remove("hidden")
    addRate(value);

}

function closeThankYou() {
    rateContent.classList.remove("hidden");

    thankYou.classList.add("hidden")
    addRate(value);
}


//! Event Listeners
submit.addEventListener("click", rated);
close.addEventListener("click", closeThankYou)
rating.forEach((rate) => {
    rate.addEventListener("click", selector);
})