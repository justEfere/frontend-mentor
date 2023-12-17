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

daily.addEventListener("click", (e) => {
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
weekly.addEventListener("click", (e) => {
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
monthly.addEventListener("click", (e) => {
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
// monthly.addEventListener("click", (e) => {
//     e.preventDefault()
//     removeSelected();
//     monthly.classList.add("selected");



//     getData().then((data) => {
//         // cardContent.innerHTML = "";
//         const cards = document.querySelectorAll(".card");
//         data.forEach((data, index) => {
//             const title = data.title;
//             const timeframe = data.timeframes.monthly

//             const numEl = cards[index].firstElementChild.lastElementChild.
//                 firstElementChild.innerHTML
//             let start = 0;

//             // const newNum = updateNum;
//             const newNum = 20;

//             const int = setInterval(() => {
//                 start += 1;

//                 cards[index].firstElementChild.lastElementChild.
//                     firstElementChild.innerHTML = start + "hrs";

//                 if (start == newNum) {
//                     clearInterval(int);
//                 }
//             }, 100);

//         })
//         // changeBgUI();
//     })

// })

// function counter(index, updateNum) {
//     const cards = document.querySelectorAll(".card");
//     const numEl = cards[0].firstElementChild.lastElementChild.
//         firstElementChild.innerHTML
//     let start = 0;

//     // const newNum = updateNum;
//     const newNum = 10;

//     const int = setInterval(() => {
//         start += 1;

//         cards[0].firstElementChild.lastElementChild.
//             firstElementChild.innerHTML = start + "hrs";

//         if (start == newNum) {
//             clearInterval(int);
//         }
//     }, 100);

// }

// function changer() {

// }
