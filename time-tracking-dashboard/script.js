const workImg = "url(images/icon-work.svg)";
const workColor = "var(--Light-red-work)";

const playImg = "url(images/icon-play.svg)";
const playColor = "var(--Soft-blue-play)";

const studyImg = "url(images/icon-study.svg)";
const studyColor = "var(--Light-red-study)";

const exerciseImg = "url(images/icon-exercise.svg)";
const exerciseColor = "var(--Lime-green-exercise)";

const socialImg = "url(images/icon-social.svg)";
const socialColor = "var(--Violet-social)";

const selfcardImg = "url(images/icon-self-care.svg)";
const selfcareColor = "var(--Soft-orange-self-care)";

// rate button
const daily = document.getElementById("daily");
const weekly = document.getElementById("weekly");
const monthly = document.getElementById("monthly")

const cardContent = document.querySelector(".card_container");

// change bg and img using action 
function changeBgUI(action) {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        const w = card.firstElementChild.firstElementChild.firstElementChild.innerHTML.toLowerCase();

        if (w === "play") {
            card.style.backgroundColor = playColor;
            card.style.backgroundImage = playImg;
        } else if (w === "work") {
            card.style.backgroundColor = workColor;
            card.style.backgroundImage = workImg;
        } else if (w === "study") {
            card.style.backgroundColor = studyColor;
            card.style.backgroundImage = studyImg;
        } else if (w === "social") {
            card.style.backgroundColor = socialColor;
            card.style.backgroundImage = socialImg;
        } else if (w === "self care") {
            card.style.backgroundColor = selfcareColor;
            card.style.backgroundImage = selfcardImg;
        } else if (w === "exercise") {
            card.style.backgroundColor = exerciseColor;
            card.style.backgroundImage = exerciseImg;
        }
    })
}

// const data = []
const getData = async () => {
    const respose = await fetch("data.json");
    return await respose.json();
}

// build card
function cardBuilder(action, time, last) {
    const cardContainer = document.querySelector(".card_container");
    const cardEl = document.createElement("div");
    cardEl.setAttribute("class", "card");
    cardEl.innerHTML = `<div class="card_body">
    <div class="menu">
    <p class="action">${action}</p>
    <a href="" class="menu">
    <img src="images/icon-ellipsis.svg" alt="eclipse">
    </a>
    </div>
    <div class="time_tracker">
    <p class="time">${time}hrs</p>
    <p class="week_before">Previous - ${last}hrs</p>
    </div>
    </div>`;
    cardContainer.appendChild(cardEl);
    changeBgUI();
}

// cardBuilder("exercise", 1, 6);

window.addEventListener("load", () => {
    getData().then((data) => {
        data.forEach(data => {
            const title = data.title;
            const timeframe = data.timeframes
            cardBuilder(title, timeframe.daily.current, timeframe.daily.previous);
        })
        changeBgUI();

        // counter();
    })
})

const useNormal = "";

daily.addEventListener(useNormal, (e) => {
    e.preventDefault();
    removeSelected();
    daily.classList.add("selected");
    getData().then((data) => {
        cardContent.innerHTML = "";
        data.forEach(data => {
            const title = data.title;
            const timeframe = data.timeframes.daily
            cardBuilder(title, timeframe.current, timeframe.previous);
        })
        changeBgUI();
    })
});
weekly.addEventListener(useNormal, (e) => {
    e.preventDefault();
    removeSelected();
    weekly.classList.add("selected");
    getData().then((data) => {
        cardContent.innerHTML = "";
        data.forEach(data => {
            const title = data.title;
            const timeframe = data.timeframes.weekly
            cardBuilder(title, timeframe.current, timeframe.previous);
        })
        changeBgUI();
    })
})

monthly.addEventListener(useNormal, (e) => {
    e.preventDefault();
    removeSelected();
    monthly.classList.add("selected");
    getData().then((data) => {
        cardContent.innerHTML = "";
        data.forEach(data => {
            const title = data.title;
            const timeframe = data.timeframes.monthly

            cardBuilder(title, timeframe.current, timeframe.previous);
        })
        changeBgUI();
    })
})

function removeSelected() {
    const allBtn = document.querySelectorAll(".jobrate");
    allBtn.forEach((rate) => {
        rate.classList.remove("selected");
    })
}
// changeBgUI()




// //! for upgrade to v2
daily.addEventListener("click", (e) => {
    e.preventDefault();
    removeSelected();
    daily.classList.add("selected");
    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
        // previousData
        let startCurrent = Number(card.firstElementChild.lastElementChild.
            firstElementChild.innerHTML.slice(0, -3))
        let startPrevious = Number(card.firstElementChild.lastElementChild.
            lastElementChild.innerHTML.split("-")[1].slice(0, -3))

        getData().then((data) => {
            const stop = data[index].timeframes.daily.current
            const previous = data[index].timeframes.daily.previous

            const int = setInterval(() => {
                if (startCurrent != stop) {
                    if (startCurrent > stop) {
                        startCurrent--;
                    } else {
                        startCurrent++;
                    }
                }
                if (startPrevious != previous) {
                    if (startPrevious > previous) {
                        startPrevious--
                    } else {
                        startPrevious++
                    }
                }
                card.firstElementChild.lastElementChild.
                    firstElementChild.innerHTML = startCurrent + "hrs";
                card.firstElementChild.lastElementChild.
                    lastElementChild.innerHTML = `Previous - ${startPrevious}hrs`;

                if (startCurrent == stop && startPrevious == previous) {
                    clearInterval(int);
                }
            }, 10);
        })

    })
});

weekly.addEventListener("click", (e) => {
    e.preventDefault();
    removeSelected();
    weekly.classList.add("selected");
    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
        // previousData
        let startCurrent = Number(card.firstElementChild.lastElementChild.
            firstElementChild.innerHTML.slice(0, -3))
        let startPrevious = Number(card.firstElementChild.lastElementChild.
            lastElementChild.innerHTML.split("-")[1].slice(0, -3))

        getData().then((data) => {
            const stop = data[index].timeframes.weekly.current
            const previous = data[index].timeframes.weekly.previous

            const int = setInterval(() => {
                if (startCurrent != stop) {
                    if (startCurrent > stop) {
                        startCurrent--;
                    } else {
                        startCurrent++;
                    }
                }
                if (startPrevious != previous) {
                    if (startPrevious > previous) {
                        startPrevious--
                    } else {
                        startPrevious++
                    }
                }
                card.firstElementChild.lastElementChild.
                    firstElementChild.innerHTML = startCurrent + "hrs";
                card.firstElementChild.lastElementChild.
                    lastElementChild.innerHTML = `Previous - ${startPrevious}hrs`;

                if (startCurrent == stop && startPrevious == previous) {
                    clearInterval(int);
                }
            }, 10);
        })

    })
})

monthly.addEventListener("click", (e) => {
    e.preventDefault()
    removeSelected();
    monthly.classList.add("selected");
    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
        // previousData
        let startCurrent = Number(card.firstElementChild.lastElementChild.
            firstElementChild.innerHTML.slice(0, -3))
        let startPrevious = Number(card.firstElementChild.lastElementChild.
            lastElementChild.innerHTML.split("-")[1].slice(0, -3))

        getData().then((data) => {
            // current data
            const stop = data[index].timeframes.monthly.current
            const previous = data[index].timeframes.monthly.previous

            const int = setInterval(() => {
                if (startCurrent != stop) {
                    startCurrent++;
                }
                if (startPrevious != previous) {
                    startPrevious++
                }
                card.firstElementChild.lastElementChild.
                    firstElementChild.innerHTML = startCurrent + "hrs";
                card.firstElementChild.lastElementChild.
                    lastElementChild.innerHTML = `Previous - ${startPrevious}hrs`;

                if (startCurrent == stop && startPrevious == previous) {
                    clearInterval(int);
                }
            }, 10);

        })

    })
})
