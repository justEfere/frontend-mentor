'use strict';

const quoteP = document.querySelector(".advice")
const button = document.querySelector(".dice");

function random(min = 0, max = 10) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let inter;

//! selects/display random quotes from fetched data
async function changeQuote() {
    const response = await fetch("https://type.fit/api/quotes");
    const data = await response.json();

    inter = setInterval(() => {
        const quote = data[random(0, data.length - 1)];
        quoteP.innerHTML = `"${quote.text}"`;
    }, 5000);

}

//! clears interval and selects/display random quotes
async function genQuote() {
    clearInterval(inter);
    const res = await fetch("https://type.fit/api/quotes");
    const data = await res.json();

    const quote = data[random(0, data.length - 1)];
    quoteP.innerHTML = `"${quote.text}"`;
}

//! on button click event
button.addEventListener("click", genQuote);

//! On window load event
window.addEventListener("load", changeQuote);

