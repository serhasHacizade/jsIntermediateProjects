$(document).ready(() => {
    const gameArea = $("#gameArea");
    const maxGameArea = 30;
    const playerPos = { "tr": 14, "td": 10 };
    const playerDir = { "up": 1, "right": 2, "down": 3, "left": 4 };
    

    let playerLength = 4;
    let gameScore = 0;
    let currentPlayerDir = playerDir["up"];
    let frameCount = 0;
    let pointPosX = Math.floor(Math.random() * 29);
    let pointPosY = Math.floor(Math.random() * 29);
    let pointPos = {"posX": pointPosX,"posY": pointPosY};
    let playerIsDead = false;


    const drawGameArea = () => {
        for (let i = 0; i < maxGameArea; i++) {
            gameArea.append(`<tr class="tr${i}"></tr>`)
            const thisTr = $(".tr" + i);
            for (let indexTd = 0; indexTd < maxGameArea; indexTd++) {
                thisTr.append(`<td class="tr${i}td${indexTd}"></td>`)
            }

        }
    };
    drawGameArea();

    const drawPoint = () => {
        let setPointPos = $(".tr" + pointPos["posX"] + "td" + pointPos["posY"]);
        setPointPos.addClass("drawPoint");
    };

    drawPoint()
    
    const playerEatPoint = () => {
        let setPointPos = $(".tr" + pointPos["posX"] + "td" + pointPos["posY"]);
        setPointPos.removeClass("drawPoint")
        pointPosX = Math.floor(Math.random() * 29);
        pointPosY = Math.floor(Math.random() * 29);
        pointPos = {"posX" : pointPosX,"posY" : pointPosY}
        setPointPos = $(".tr" + pointPos["posX"] + "td" + pointPos["posY"]);
        setPointPos.addClass("drawPoint");
        gameScore ++;
        playerLength ++;
    };


    document.addEventListener("keypress", (e) => {
        if (e.key == "w") {
            currentPlayerDir = playerDir["up"];
        } else if (e.key == "d") {
            currentPlayerDir = playerDir["right"];
        } else if (e.key == "s") {
            currentPlayerDir = playerDir["down"];
        } else if (e.key == "a") {
            currentPlayerDir = playerDir["left"];
        }
    });

    const drawPlayer = () => {
        frameCount++;
        let getPlayerPos; 

        if (currentPlayerDir === 1) {
            playerPos["tr"]--;
            getPlayerPos = $(".tr" + playerPos["tr"] + "td" + playerPos["td"]);
            getPlayerPos.addClass("drawPlayer frameCount" + frameCount);
        } else if (currentPlayerDir === 2) {
            playerPos["td"]++;
            getPlayerPos = $(".tr" + playerPos["tr"] + "td" + playerPos["td"]);
            getPlayerPos.addClass("drawPlayer frameCount" + frameCount);
        } else if (currentPlayerDir === 3) {
            playerPos["tr"]++;
            getPlayerPos = $(".tr" + playerPos["tr"] + "td" + playerPos["td"]);
            getPlayerPos.addClass("drawPlayer frameCount" + frameCount);
        } else if (currentPlayerDir === 4) {
            playerPos["td"]--;
            getPlayerPos = $(".tr" + playerPos["tr"] + "td" + playerPos["td"]);
            getPlayerPos.addClass("drawPlayer frameCount" + frameCount);
        } else {
            alert("Error drawing player!");
        }


        let calcPlayerTailPos = frameCount - playerLength;
        let getPlayerTailPos = $(".frameCount" + calcPlayerTailPos);
        getPlayerTailPos.removeClass("drawPlayer frameCount" + calcPlayerTailPos)
    };

    const scoreHandler = () => {document.getElementById("gameScore").innerHTML = gameScore};
    const deathHandler = () => {document.getElementById("gameStatus").innerHTML = "You loose!"};
    scoreHandler();
    setInterval(() => {
        let checkNextPlayerPosX = playerPos["tr"];
        let checkNextPlayerPosY = playerPos["td"];
        if (currentPlayerDir === 1) {
            checkNextPlayerPosX -= 1;
        } else if (currentPlayerDir === 2) {
            checkNextPlayerPosY += 1;
        } else if (currentPlayerDir === 3) {
            checkNextPlayerPosX += 1;
        } else if (currentPlayerDir === 4) {
            checkNextPlayerPosY -= 1;
        } else {
            alert("Error checking player collision!");
        }


        if (playerPos["tr"] == 30 || playerPos["td"] == 30 || playerPos["tr"] == -1 || playerPos["td"] == -1) {
            deathHandler();
        } else if (playerPos["tr"] == pointPos["posX"] && playerPos["td"] == pointPos["posY"] && playerIsDead == false) {
            playerEatPoint();
            scoreHandler();
            drawPlayer();
        } else if ($(".tr" + checkNextPlayerPosX + "td" + checkNextPlayerPosY).hasClass("drawPlayer")) {
            playerIsDead == true;
            deathHandler();
        }

        else if (playerIsDead == false) {   
            drawPlayer();
        }
    }, 100);

})