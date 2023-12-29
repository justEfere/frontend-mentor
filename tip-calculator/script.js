'use strict';
const tipAmountEl = document.querySelector(".tip_amount");
const totalPerPerEl = document.querySelector(".total_per");
const errorMsg = document.querySelector(".error");
const tips = document.querySelectorAll(".tip");
const customInput = document.getElementById("custom");
const peopleInput = document.getElementById("people");
const billAmount = document.getElementById("bill");

tips.forEach(tip => {
    tip.addEventListener("change", (e) => {
        customInput.value = "";
        if (billAmount.value != "" && Number(billAmount.value) != 0) {
            if (peopleInput.value != "" && Number(peopleInput.value) != 0) {
                const amount = Number(billAmount.value);
                const tipPerc = Number(tip.value.replace(/[^0-9]/g, ""));
                const persons = Number(peopleInput.value);
                tipCalc(amount, tipPerc, persons);
            }
        }
    })
})

const resetBtn = document.querySelector(".reset");

resetBtn.addEventListener("click", (e) => {
    billAmount.value = null;
    tips.forEach((tip => {
        if (tip.checked) {
            tip.checked = false;
        }
    }))
    customInput.value = null;
    peopleInput.value = null;
    tipAmountEl.innerHTML = "$0.0";
    totalPerPerEl.innerHTML = "$0.0";

})


tipAmountEl.innerHTML = "$0.0";
totalPerPerEl.innerHTML = "$0.0";

billAmount.addEventListener("input", (e) => {
    billAmount.style.border = "none";
    if (billAmount.value != "" && Number(billAmount.value) != 0) {
        const checked = Array.from(tips).find(tip => tip.checked);
        if (checked) {
            customInput.value = "";
            if (peopleInput.value != "" && Number(peopleInput.value) != 0) {
                removeError();
                const amount = Number(billAmount.value);
                const tipPerc = Number(checked.value.replace(/[^0-9]/g, ""));
                const persons = Number(peopleInput.value);
                tipCalc(amount, tipPerc, persons);
            } else if (peopleInput.value == "0") {
                showError(peopleInput, "Can't be zero")
            } else {
                showError(peopleInput, "Can't be empty")
            }
        } else {
            if (customInput.value != "" && Number(customInput.value) != 0) {

                if (peopleInput.value != "" && Number(peopleInput.value) != 0) {
                    removeError();
                    const amount = Number(billAmount.value);
                    const tipPerc = Number(customInput.value.replace(/[^0-9]/g, ""));
                    const persons = Number(peopleInput.value);
                    tipCalc(amount, tipPerc, persons);
                } else if (peopleInput.value == "0") {
                    showError(peopleInput, "Can't be zero")
                } else {
                    showError(peopleInput, "Can't be empty")
                }
            } else {
                if (peopleInput.value != "" && Number(peopleInput.value) != 0) {
                    customInput.style.border = "1px solid red";
                }
            }
        }
    } else {
        tipAmountEl.innerHTML = "$0.0";
        totalPerPerEl.innerHTML = "$0.0";
    }
})


customInput.addEventListener("input", (e) => {
    if (Number(customInput.value) && Number(customInput.value) !== 0) {
        customInput.style.border = "2px solid var(--Strong-cyan)";
        const tips = document.querySelectorAll(".tip");
        tips.forEach((tip => {
            if (tip.checked) {
                tip.checked = false;
            }
        }))

        if (billAmount.value != "" && Number(billAmount.value) != 0) {
            if (peopleInput.value != "" && Number(peopleInput.value) != 0) {
                removeError();
                const amount = Number(billAmount.value);
                const tipPerc = Number(customInput.value.replace(/[^0-9]/g, ""));
                const persons = Number(peopleInput.value);
                tipCalc(amount, tipPerc, persons);
            } else if (peopleInput.value == "0") {
                showError(peopleInput, "Can't be zero")
            } else {
                showError(peopleInput, "Can't be empty")
            }
        } else {
            tipAmountEl.innerHTML = "$0.0";
            totalPerPerEl.innerHTML = "$0.0";
        }

    } else {
        return;
    }
})


peopleInput.addEventListener("input", (e) => {
    if (peopleInput.value != "" && Number(peopleInput.value != 0)) {

        // removeError
        removeError();

        if (billAmount.value != "" && Number(billAmount.value) != 0) {
            billAmount.style.border = "none";
            const checked = Array.from(tips).find(tip => tip.checked);
            if (checked) {
                billAmount.style.border = "none";
                customInput.value = "";
                if (peopleInput.value != "" && Number(peopleInput.value) != 0) {
                    removeError();
                    const amount = Number(billAmount.value);
                    const tipPerc = Number(checked.value.replace(/[^0-9]/g, ""));
                    const persons = Number(peopleInput.value);
                    tipCalc(amount, tipPerc, persons);
                } else if (peopleInput.value == "0") {
                    showError(peopleInput, "Can't be zero")
                } else {
                    showError(peopleInput, "Can't be empty")
                }
            } else {
                if (customInput.value != "" && Number(customInput.value) != 0) {

                    if (peopleInput.value != "" && Number(peopleInput.value) != 0) {
                        removeError();
                        const amount = Number(billAmount.value);
                        const tipPerc = Number(customInput.value.replace(/[^0-9]/g, ""));
                        const persons = Number(peopleInput.value);
                        tipCalc(amount, tipPerc, persons);
                    } else if (peopleInput.value == "0") {
                        showError(peopleInput, "Can't be zero")
                    } else {
                        showError(peopleInput, "Can't be empty")
                    }
                }
            }
        } else {
            tipAmountEl.innerHTML = "$0.0";
            totalPerPerEl.innerHTML = "$0.0";
            const billarea = document.getElementById("bill");
            billarea.style.border = "2px solid red";
        }

    } else {
        showError(peopleInput, "Can't be zero");
    }
})

function tipCalc(amount, perc, persons) {
    const tipAMount = (((perc / 100) * amount) / persons).toFixed(2);
    const totalPerPerson = ((amount + (perc / 100 * amount)) / persons).toFixed(2);

    tipAmountEl.textContent = `$${tipAMount}`;
    totalPerPerEl.textContent = `$${totalPerPerson}`;
}

function showError(item, message) {
    item.style.outlineColor = "orangered";
    if (message) {
        errorMsg.style.display = "block";
        errorMsg.textContent = message;
    }
}
function showOk(item) {
    item.style.outlineColor = "var(--Strong-cyan)";
    errorMsg.style.display = "none";
}
function removeError() {
    errorMsg.style.display = "none";
    peopleInput.style.outlineColor = "var(--Strong-cyan)";
}
