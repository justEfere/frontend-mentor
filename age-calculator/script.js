
const day = document.getElementById("day_input");
const month = document.getElementById("month_input");
const year = document.getElementById("year_input");


const yearNow = new Date().getFullYear();
const nowStamp = new Date().getTime();


[day, month, year].forEach(input => {
    input.addEventListener("focus", (e) => {
        showSuccess(input);
    })
});

[day, month, year].forEach(element => {
    element.addEventListener("input", (e) => {

        // remove error mode
        showSuccess(element);
        element.value.split("").forEach(char => {
            // if any value is not a number, display error
            if (!/[0-9]/g.test(char)) {
                // show error mode
                showError(element, "Only digit");
            }
        })
    })
})
const digi = document.querySelectorAll(".digi");

digi.forEach((digi) => {
    digi.innerHTML = "--";
})

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    calcAge();
    // check if the value are not empty

})

function calcAge() {
    let errorContainer = [];
    [day, month, year].forEach(item => {
        if (item.value == "") {
            showError(item, "This field id required");
        } else {
            // test if any has an item that is not a number
            item.value.split("").forEach(char => {
                if (!/[0-9]/g.test(char)) {
                    errorContainer.push(false);
                }
            })
        }

    })

    if (errorContainer.includes(false)) {
        //todo: do nothing else if error is in the input
        console.log("error")
    } else {

        // months with 31
        const thirtyFirsts = [1, 3, 5, 7, 8, 10, 12];

        // checks if the dates are valid
        if (day.value != "") {
            if (day.value <= 0 || day.value > 31) {
                showError(day, "Invalid day");
            }
        }

        if (month.value != "") {
            if (month.value <= 0 || month.value > 12) {
                showError(month, "Invalid month");
            }
            if (month.value == 2) {
                if (day.value != "" && day.value > 0) {
                    if (day.value >= 30) {
                        showError(day, "Invalid day for Feb");
                    }
                }
            }

            if (thirtyFirsts.includes(Number(month.value))) {
                if (day.value != "" && day.value > 0 && day.value < 32) {
                    showSuccess(day);
                }
            } else {
                if (day.value > 30 && month.value != 2) {
                    showError(day, "Invalid day for the month")
                }
            }
        }

        if (year.value != "") {
            if (year.value <= 1970 || year.value > yearNow) {
                showError(year, "Invalid year");
            }
        }
        if (isValidDate(day.value, month.value, year.value)) {
            const stam = new Date(year.value, month.value - 1, day.value).getTime();
            const minus = Math.floor(nowStamp / 1000) - Math.floor(stam / 1000);
            const minutes = minus / 60;
            const hours = minutes / 60;
            const dayss = Math.floor(hours / 24);

            digi.forEach((digi) => {
                digi.innerHTML = "--";
            })

            if (dayss > 365) {
                const theYear = Math.floor(dayss / 365);
                digi[0].innerHTML = theYear;
                if ((dayss - (theYear * 365)) > 30) {
                    const theMonths = Math.floor((dayss - theYear * 365) / 30);
                    digi[1].innerHTML = theMonths;

                    if (((dayss - theYear * 365) % 30) < 30) {
                        const theDays = (dayss - theYear * 365) % 30;
                        digi[2].innerHTML = theDays;
                    } else {
                        // //todo: the remaining days is greater than 30; dont know if thats possible
                        // console.log("Remaining days is greater than 30")
                    }
                } else {
                    // remaining days is less than 30
                    digi[1].innerHTML = "0";

                    if (theYear > 4) {
                        digi[2].innerHTML = Math.abs(Math.abs((dayss - (theYear * 365))) - Math.floor(theYear / 4));
                    } else {
                        console.log("here")
                        digi[2].innerHTML = Math.floor((dayss - (theYear * 365)));
                    }
                }
                // less than a year conditions
            } else {

                digi[0].innerHTML = "0";

                if (dayss > 30) {
                    digi[1].innerHTML = Math.floor(dayss / 30);
                    if (Math.floor(dayss / 30) > 7) {
                        digi[2].innerHTML = Math.ceil(dayss % 30 - 3);
                    } else {
                        digi[2].innerHTML = Math.ceil(dayss % 30);
                    }

                } else {
                    digi[1].innerHTML = "0";
                    digi[2].innerHTML = Math.floor(dayss);
                }
            }
        } else {
            return;
        }
    };
}


function showError(element, message) {
    element.nextElementSibling.style.display = "block";
    element.previousElementSibling.style.color = "var(--Light-red)";
    element.style.border = "1px solid var(--Light-red)";
    element.nextElementSibling.innerHTML = message;
}
function showSuccess(element) {
    element.nextElementSibling.style.display = "none";
    element.previousElementSibling.style.color = "var(--Smokey-grey)";
    element.style.border = "1px solid var(--Light-grey)";
}


function isValidDate(day, month, year) {
    // Check if the year is a leap year
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

    // Define the maximum number of days for each month
    const maxDaysInMonth = [
        31,
        isLeapYear ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];

    // Validate the month, day, and year
    if (month >= 1 && month <= 12 && day >= 1 && day <= maxDaysInMonth[month - 1] && year >= 0) {
        return true;
    } else {
        return false;
    }
}
