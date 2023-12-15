
const listContainer = document.querySelector(".item_list");
const items = document.querySelectorAll(".item")
const body = document.querySelector("body");


const themeBtn = document.querySelector(".theme");
// theme bg image
const mobileMoodImg = document.getElementById("mobile_mood_img");
const desktopMoodImg = document.getElementById("desktop_mood_img");

const cancelBtn = document.querySelectorAll(".cancel");

const check = document.querySelectorAll(".check");

const form = document.querySelector(".add_new_form");
const formInput = document.getElementById("input_new");

const clearCompletedBtn = document.querySelector(".clear_completed");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = formInput.value;
    if (inputValue === "") {
        return;
    }
    // create items
    const li = document.createElement("li");
    li.className = "item";
    li.setAttribute("draggable", true);
    li.innerHTML = `<span class="check"></span>
    <a href="#" class="item_title">${inputValue}</a>
    <span class="cancel">
      <img class="cancel_icon" src="images/icon-cross.svg" alt="cancel icon">
    </span>`;


    listContainer.insertBefore(li, listContainer.firstElementChild);
    if (themeBtn.classList.contains("light")) {
        li.children[1].style.color = "var(--Dark-Grayish-Blue)";
    }
    formInput.value = "";
    items_left();
    li.addEventListener("dragstart", (e) => {
        setTimeout(() => {
            li.classList.add("dragging");
        }, 0);
    });
    li.addEventListener("dragend", (e) => {
        li.classList.remove("dragging");
    })
})


// remove item from list
// mark item as done
listContainer.addEventListener("click", (e) => {
    if (e.target.parentElement.classList.contains("cancel")) {
        const item = e.target.parentElement.parentElement;
        const itemParent = item.parentElement
        itemParent.removeChild(item);
        items_left();
    }
    if (e.target.classList.contains("check")) {
        const checkItem = e.target;
        checkItem.parentElement.classList.toggle("cleared");
        checkItem.classList.toggle("checked");
        items_left();
    }

    if (e.target.classList.contains("item")) {
        const item = e.target;
    }
})

// dark and light moode
themeBtn.addEventListener("click", (e) => {

    // screen size 
    const screenSize = window.innerWidth;
    const body = document.querySelector("body");
    const addItem = document.querySelector(".add_item");
    const container = document.querySelector(".items_container");
    const mobileSort = document.querySelector(".mobile_sort")

    const itemsTitle = document.querySelectorAll(".item_title");

    // dark mood
    if (themeBtn.classList.contains("light")) {
        // on dark mood
        themeBtn.classList.remove("light")
        themeBtn.innerHTML = `<img src="images/icon-sun.svg" alt="dark-light theme">`;



        if (screenSize <= 599) {
            mobileMoodImg.setAttribute("srcset", "images/bg-mobile-dark.jpg")
        } else {
            desktopMoodImg.setAttribute("srcset", "images/bg-desktop-dark.jpg")
        }

        body.style.backgroundColor = "var(--Very-Dark-Blue)";


        [addItem, container, mobileSort].forEach((item) => {
            item.style.backgroundColor = "var(--Very-Dark-Desaturated-Blue)";
        })

        itemsTitle.forEach(item => {
            item.style.color = "var(--Light-Grayish-Blue-hover)";
        })
        formInput.style.color = "var(--Very-Light-Gray)"

    } else {
        // on light mood
        themeBtn.classList.add("light");
        themeBtn.innerHTML = `<img src="images/icon-moon.svg" alt="dark-light theme">`;

        if (screenSize <= 599) {
            mobileMoodImg.setAttribute("srcset", "images/bg-mobile-light.jpg")
        } else {
            desktopMoodImg.setAttribute("srcset", "images/bg-desktop-light.jpg")
        }

        [body, addItem, container, mobileSort].forEach((item) => {
            item.style.backgroundColor = "var(--Very-Light-Gray)";
        })
        itemsTitle.forEach(item => {
            item.style.color = "var(--Dark-Grayish-Blue)";
        })
        formInput.style.color = "var(--Very-Dark-Blue)"
    }

})


// drag drop events
items.forEach((item) => {
    item.addEventListener("dragstart", () => {
        setTimeout(() => {
            item.classList.add("dragging");
        }, 0);
    });
    item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
    })
})

const initSortableList = (e) => {
    e.preventDefault();
    const itemDragged = listContainer.querySelector(".dragging");
    const siblings = [...listContainer.querySelectorAll(".item:not(.dragging)")];

    let nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2
    })
    listContainer.insertBefore(itemDragged, nextSibling);
}

listContainer.addEventListener("dragover", initSortableList);
listContainer.addEventListener("dragenter", (e) => {
    e.preventDefault();
})

const sorter = document.querySelectorAll(".sortBtn");

sorter.forEach(btn => {
    btn.addEventListener("click", (e) => {
        remveSorted(sorter);
        btn.classList.toggle("sorted");


        // sorting
        if (btn.classList.contains("all")) {

            const allItems = document.querySelectorAll(".item")
            allItems.forEach((item) => {
                if (item.classList.contains("cleared")) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "flex";
                }
            })
        } else if (btn.classList.contains("active")) {
            const allItems = document.querySelectorAll(".item")
            allItems.forEach((item) => {
                if (item.classList.contains("cleared")) {
                    item.style.display = "none";
                } else {
                    item.style.display = "flex";
                }
            })

        } else {
            const allItems = document.querySelectorAll(".item")
            allItems.forEach((item) => {
                if (!item.classList.contains("cleared")) {
                    item.style.display = "none";
                } else {
                    item.style.display = "flex";
                }
            })
        }
    })
})

// clear completed from list
clearCompletedBtn.addEventListener("click", () => {
    const getItems = document.querySelectorAll(".cleared");
    const listContain = document.querySelector(".item_list");
    getItems.forEach((completed) => {
        listContain.removeChild(completed);
    });
})


function remveSorted(sorted) {
    sorted.forEach((btn) => {
        btn.classList.remove("sorted")
    })
}

function items_left() {
    const updateEl = document.querySelector(".items_left");
    const allItems = document.querySelectorAll(".item:not(.cleared)");
    const count = allItems.length;
    updateEl.innerHTML = `${count} items left`;

}
items_left();