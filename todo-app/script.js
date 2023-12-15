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

// set todo initial value
let todo = loadItemFromStorage() ? loadItemFromStorage() : [];

// create item from form input
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = formInput.value;
    if (inputValue === "") {
        return;
    }
    // // create items
    createItem(inputValue);
})

//! create new item
//! accepts value, state of the item and if item is being loaded from localstorage
function createItem(value, state = false, fromlocal = false) {
    // create items
    const li = document.createElement("li");
    li.className = "item";
    if (state) {
        li.classList.add("cleared");
    }
    li.setAttribute("draggable", true);
    li.innerHTML = `<span class="check ${state ? "checked" : ""}"></span>
    <a href="#" class="item_title">${value}</a>
    <span class="cancel">
    <img class="cancel_icon" src="images/icon-cross.svg" alt="cancel icon">
    </span>`;


    listContainer.insertBefore(li, listContainer.firstElementChild);
    if (themeBtn.classList.contains("light")) {
        li.children[1].style.color = "var(--Dark-Grayish-Blue)";
    }
    formInput.value = "";
    items_left();
    if (!fromlocal) {
        saveToLocal(value, false);
    }
    li.addEventListener("dragstart", (e) => {
        setTimeout(() => {
            li.classList.add("dragging");
        }, 0);
    });
    li.addEventListener("dragend", (e) => {
        li.classList.remove("dragging");
    })
}


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

    updateLocalStorageData();
})

// dark and light moode
themeBtn.addEventListener("click", (e) => {
    // dark mood
    updateThemeUI();
    saveTheme();
})

function updateThemeUI(state = null) {
    // screen size 
    const screenSize = window.innerWidth;
    const body = document.querySelector("body");
    const addItem = document.querySelector(".add_item");
    const container = document.querySelector(".items_container");
    const mobileSort = document.querySelector(".mobile_sort")

    const itemsTitle = document.querySelectorAll(".item_title");



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
}


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
    updateLocalStorageData();
})

function saveToLocal(value, state) {
    todo.push({ "title": value, "state": state });
    localStorage.setItem("todo", `${JSON.stringify(todo)}`)
}

// return data from local storage
function loadItemFromStorage() {
    const itemsfrom = JSON.parse(localStorage.getItem("todo"));
    return itemsfrom;
}

// update UI from localstorage as page loads
function undateUIfromLocalData() {
    const data = loadItemFromStorage();

    data.forEach(d => {
        createItem(d.title, d.state, true);
    })

}


function clearLocal() {
    localStorage.clear("item")
}
// saveToLocal();
// clearLocal()

// sort button area: ensure only 1 button is active at a time
function remveSorted(sorted) {
    sorted.forEach((btn) => {
        btn.classList.remove("sorted")
    })
}


// count update
function items_left() {
    const updateEl = document.querySelector(".items_left");
    const allItems = document.querySelectorAll(".item:not(.cleared)");
    const count = allItems.length;
    updateEl.innerHTML = `${count} items left`;

}
// count items not completed
items_left();

window.addEventListener("load", undateUIfromLocalData);

// update localstorage data after check and remove button clicked
function updateLocalStorageData() {
    todo = [];
    const allItems = document.querySelectorAll(".item");
    allItems.forEach((item) => {
        const title = item.querySelector(".item_title").innerHTML;
        const state = item.classList.contains("cleared") ? true : false
        todo.push({ "title": title, "state": state });

    })
    localStorage.setItem("todo", JSON.stringify(todo));
}

//! store theme state
//! return true for light and false for dark mood
function saveTheme() {
    const theme = document.querySelector(".theme")
    let themeState;
    if (theme.classList.contains("light")) {
        localStorage.setItem("theme", "light")
        themeState = "light";
    } else {
        localStorage.setItem("theme", "dark")
        themeState = "dark";
    }
    return themeState;
}

function updateThemeFromLocal() {
    const theme = localStorage.getItem("theme");
    // screen size 
    const screenSize = window.innerWidth;
    const body = document.querySelector("body");
    const themeBtn = document.querySelector(".theme");
    const addItem = document.querySelector(".add_item");
    const container = document.querySelector(".items_container");
    const mobileSort = document.querySelector(".mobile_sort")
    const mobileMoodImg = document.getElementById("mobile_mood_img");
    const desktopMoodImg = document.getElementById("desktop_mood_img");
    const itemsTitle = document.querySelectorAll(".item_title");
    const formInput = document.getElementById("input_new");



    if (theme == "dark") {
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
        formInput.style.color = "var(--Very-Light-Gray)";


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

}
window.addEventListener("load", updateThemeFromLocal)