'use strict';

const link = document.querySelectorAll("button")
const overlay = document.querySelector(".overlay");

link.forEach((button) => {
    button.addEventListener("click", function (e) {
        e.preventDefault();
        if (overlay.style.display === 'flex') {
            overlay.style.display = 'none';
        } else {
            overlay.style.display = 'flex';
        }
    })
})