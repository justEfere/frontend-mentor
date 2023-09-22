'use strict';

// mobile nav toggle
const mobileOpen = document.querySelector(".mobile-icon");
const modal = document.querySelector(".mobile-nav");
const mobileCloseBtn = document.querySelector(".modal-close");
const mobileLinks = document.querySelectorAll("li");
// const textarea = document.querySelector("")

// faqs toggle
const allFAQs = document.querySelectorAll(".faq");

// contact form
const mobileForm = document.getElementById("mobile-form")
const desktopForm = document.getElementById("desktop-form");



// console.log(mobileForm, desktopForm)


// FAQS
function closeFaqs() {
    allFAQs.forEach((faq) => {
        if (faq.lastElementChild.classList.contains("openClose")) {
            faq.lastElementChild.classList.remove("openClose");
        }
    })
}

function openFaq(e) {
    const parentEl = e.target.parentElement;
    const title = parentEl.firstElementChild
    // console.log(title)
    if (parentEl.className === "faq-header") {
        const faqContent = parentEl.nextElementSibling;
        // closeFaqs();
        faqContent.classList.toggle("openClose")
    }
}
allFAQs.forEach((faq) => {
    faq.addEventListener("click", openFaq);
})
// FAQS END //


// MOBILE NAV //
function openMobileNav(e) {
    const button = e.target;
    modal.style.display = "block";
    button.style.visibility = "hidden";
}

function closeMobileNav(e) {
    const el = e.target;
    if (el.classList.contains("modal-close-icon")) {
        modal.style.display = "none";
        const button = document.querySelector(".mobile-icon");
        const xBtn = button.firstElementChild;
        xBtn.style.visibility = "visible";
        button.style.visibility = "visible";
    }

}

// close mobile nav when link is clicked
mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
        modal.style.display = "none";
        const button = document.querySelector(".mobile-icon");
        const xBtn = button.firstElementChild;
        xBtn.style.visibility = "visible";
        button.style.visibility = "visible";
    });
})
// MOBILE NAV END //






// EVENTS
mobileOpen.addEventListener("click", openMobileNav);
mobileCloseBtn.addEventListener("click", closeMobileNav);

