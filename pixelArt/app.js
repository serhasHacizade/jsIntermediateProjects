const container = document.querySelector(".container");
const gridButton = document.getElementById("submit");
const clearGridButton = document.getElementById("clear");
const gridWidth = document.getElementById("widthRange");
const gridHeight = document.getElementById("heightRange");
const colorButton = document.getElementById("colorInput");
const eraseBtn = document.getElementById("erase");
const paintBtn = document.getElementById("paint");
const widthValue = document.getElementById("widthValue");
const heightValue = document.getElementById("heightValue");


//event object
let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend"
    }
};
let deviceType = "";

//initially draw and eraseBtn would be false
let draw = false;
let erase = false;
const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return false;
  } catch (error) {
    deviceType = "mouse"
    return false;
  }  
};
isTouchDevice();

//gridbutton functions
gridButton.addEventListener("click", () => {
    container.innerHTML = "";
    let count = 0;
    for (let i = 0; i < gridHeight.value; i++) {
        count += 2;
        let div = document.createElement("div");
        div.classList.add("gridRow");
        for (let j = 0; j < gridWidth.value; j++) {
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id",`gridCol${count}`);
            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                if (erase) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorButton.value;
                }
            });
            col.addEventListener(events[deviceType].move, (e) => {
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY
                ).id;
                checker(elementId)
            });
            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });
            div.appendChild(col);

        }
        container.appendChild(div);  
    }
});
const checker = (elementId) => {
    let gridColumns = document.querySelectorAll(".gridCol");
    gridColumns.forEach(element => {
        if (elementId == element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = colorButton.value;
            }
            else if (draw && erase) {
                element.style.backgroundColor = "transparent";
            }
        }
    });
}

//clear button function
clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";
});

//erase button function
eraseBtn.addEventListener("click", () => {
    erase = true;
});

//paint button function
paintBtn.addEventListener("click", () => {
    erase = false;
});

//display grid width and height
gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value
});
gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value
});

//this ranges must be 0 when dom loaded
window.onload = () => {
    gridWidth.value = 1;
    gridHeight.value = 1;
};