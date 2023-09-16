'use strict';
const cha = document.querySelectorAll(".gr-le");
const balance = document.querySelector(".amount-balance");

async function loadData() {
    const res = await fetch("./data.json")
    const data = await res.json();
    let sum = 0;
    data.forEach((da) => {

        sum += da.amount;
    })
    balance.innerHTML = `$${sum}`;


    cha.forEach((chart, index) => {
        const { day } = data[index];
        const { amount } = data[index];


        const box = chart.firstElementChild;

        if (amount > 50) {
            box.style.backgroundColor = "hsl(186, 34%, 60%)";
            box.style.height = `${((amount) / 100) * 178}px`;
            box.querySelector(".d-am").innerHTML = `$${amount}`;

        }
        box.style.height = `${((amount) / 100) * 178}px`;
        box.querySelector(".d-am").innerHTML = `$${amount}`;


        chart.lastElementChild.textContent = day;
    })

}


loadData()