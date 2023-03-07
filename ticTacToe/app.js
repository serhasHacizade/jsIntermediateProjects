let btnRef = document.querySelectorAll(".btnOption");
let popUpRef = document.querySelector(".popUp");
let newGameBtn = document.getElementById("newGame");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

let winningPattern = [[0,1,2], [0,3,6], [2,5,8], [6,7,8], [3,4,5], [1,4,7],[0,4,8],[2,4,6]];


let xTurn = true;
let count = 0;


const disableBtns = () => {
    btnRef.forEach(element => (element.disabled = true));
    popUpRef.classList.remove("hide");
}; 
const winFunction = letter => {
    disableBtns();
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' wins"
    }else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' wins"
    }
};

const drawFunction = () => {
    disableBtns();
    msgRef.innerHTML = "&#x1F60E; <br> It's a draw"
};

const enableBtns = () => {
    btnRef.forEach(element =>{
        element.innerText = "";
        element.disabled = false;
    });
    popUpRef.classList.add("hide");
};

newGameBtn.addEventListener("click", () => {
    count = 0;
    enableBtns();
});


restartBtn.addEventListener("click", () => {
    count = 0;
    enableBtns();
});



const winChecker = () => {
    for(let i of winningPattern) {
        let [element1, element2, element3]  = [btnRef[i[0]].innerText, btnRef[i[1]].innerText, btnRef[i[2]].innerText]
        if (element1 != "" && element2 != "" && element3 != "") {
            if (element1 == element2 && element2== element3) {
                winFunction(element1);
            }
        }
    }
}

btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            element.innerText = "X";
            element.disabled = true;
        }
        else {
            xTurn = true;
            element.innerText = "O";
            element.disabled = true;
        }
        count += 1;
        if (count == 9) {
            drawFunction();
        }
        winChecker();
    });
});

window.onload = enableBtns;