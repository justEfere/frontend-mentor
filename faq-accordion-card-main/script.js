'use strict';
const accordionHeader = document.querySelectorAll(".faq-header");
const carets = document.querySelectorAll(".caret");


function open(accordion) {
    const selected = accordion.target;
    if (selected.parentElement.classList.contains("faq-header")) {
        closeOppened();
        rotateCarets();
        const header = selected.parentElement;
        const caret = header.lastElementChild;
        const content = selected.parentElement.nextElementSibling;
        caret.classList.add("rotate");
        header.classList.add("active")
        content.classList.toggle("flex")
    }

}

function rotateCarets() {
    carets.forEach((caret) => {
        if (caret.classList.contains("rotate")) {
            caret.classList.remove("rotate")
        }
    })
}

function closeOppened() {
    accordionHeader.forEach((acc) => {
        acc.classList.remove("active")
        acc.nextElementSibling.classList.remove("flex")
    })
}



// Add event listener to all accordion
accordionHeader.forEach((accordion) => {
    accordion.addEventListener("click", open);
})
