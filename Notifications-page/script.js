"use strict";

const notificationCounter = document.querySelector(".counter");
const allNotifications = document.querySelectorAll(".unmark");
const markAll = document.querySelector(".mark");

markAll.addEventListener("click", (e) => {
    const redMark = document.querySelectorAll(".unread");
    allNotifications.forEach(item => {
        item.classList.remove("unmark");
        item.lastElementChild.firstElementChild.lastElementChild.classList.add("remove");
        counter();
    })
})

function counter() {
    const allnoti = document.querySelectorAll(".unmark");
    const count = allnoti.length;
    if (count) {
        notificationCounter.style.display = "inline-block";
        notificationCounter.textContent = count;
    } else {
        notificationCounter.style.display = "none";
    }
}

allNotifications.forEach(item => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        item.classList.toggle("unmark");
        item.lastElementChild.firstElementChild.lastElementChild.classList.toggle("remove");
        counter();
    })
})

