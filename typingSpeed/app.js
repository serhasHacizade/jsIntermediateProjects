const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");

quoteInputElement.addEventListener("input", () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll("span")
    const arrayValue = quoteInputElement.value.split("")
    let correct = true
    arrayQuote.forEach((charSpan, index) => {
        const char = arrayValue[index]
        if (char == null) {
            char.classList.remove("correct")
            char.classList.remove("incorrect")
            correct = false
        }else if (char === charSpan.innerText) {
            charSpan.classList.add("correct")
            charSpan.classList.remove("incorrect")
        }else {
            charSpan.classList.remove("correct")
            charSpan.classList.add("incorrect")
            correct = false
        }
    })
    if (correct) getNextQuote();
})

// this function fetching  
const getRandomApi = () => {
    return fetch("https://api.quotable.io/random")
        .then(response => response.json())
        .then(data => data.content)
    
}

//this function split pieces of every letters and spaces
const getNextQuote = async () => {
    const quote = await getRandomApi();
    quoteDisplayElement.innerHTML = "";
    quote.split("").forEach(char => {
        const charSpan = document.createElement("span")
        charSpan.innerText = char
        quoteDisplayElement.appendChild(charSpan)
    });
    quoteInputElement.value = null;
    startTimer();
}

//this both of functions are timer function
let startTime;
const startTimer = () => {
    timerElement.innerText = 0;
    startTime = new Date;
    setInterval(() => {
        timer.innerText = getTimerTime()
    },1000)
}

const getTimerTime = () => {
    return Math.floor((new Date() - startTime)/1000);
}

getNextQuote()

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("quoteInput").focus();
});