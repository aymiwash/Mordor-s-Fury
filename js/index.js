
window.addEventListener('load', () => {

    const startButton = document.querySelector("#start-button")
    const restartButton = document.querySelector('#restart-button')
    const introAudio = document.querySelector("#intro-audio")
    const startScreen = document.querySelector("#start-screen")
    const introScreen = document.querySelector("#intro-text")
    const playButton = document.querySelector("#play")
    const health = document.querySelector("#health")
    const score = document.querySelector("#score")

    let game
    let shootOnce = false
    let leftKeyPressed = false
    let rightKeyPressed = false
    let upKeyPressed = false
    let downKeyPressed = false



    /*Starting game*/
    startButton.addEventListener("click", () => {
        introAudio.play()
        introAudio.volume = 0.6
        startScreen.style.display = "none"
        introScreen.style.opacity = "0.8"
        playButton.addEventListener("click", () => {
            introAudio.pause()
            introScreen.style.opacity = 0
            setTimeout(() => {
                introScreen.style.display = "none"
            }, 200)
            game = new Game
            game.start()
            score.style.display = "block"
            health.style.display = "block"

        })
    })



    //trolling
    //keyUp
    document.querySelector('.up').addEventListener("mousedown", () => {
        const keyDownUpEvent = new KeyboardEvent("keydown", {
            code: "ArrowUp",
        });
        document.dispatchEvent(keyDownUpEvent);
    })
    document.querySelector('.up').addEventListener("mouseup", () => {
        const keyUpUpEvent = new KeyboardEvent("keyup", {
            code: "ArrowUp",
        });
        document.dispatchEvent(keyUpUpEvent);
    })

    //keydown
    document.querySelector('.down').addEventListener("mousedown", () => {
        const keyDownDownEvent = new KeyboardEvent("keydown", {
            code: "ArrowDown",
        });
        document.dispatchEvent(keyDownDownEvent);
    })
    document.querySelector('.down').addEventListener("mouseup", () => {
        const keyUpDownEvent = new KeyboardEvent("keyup", {
            code: "ArrowDown",
        });
        document.dispatchEvent(keyUpDownEvent);
    })

    //keyleft
    document.querySelector('.left').addEventListener("mousedown", () => {
        const keyDownLeftEvent = new KeyboardEvent("keydown", {
            code: "ArrowLeft",
        });
        document.dispatchEvent(keyDownLeftEvent);
    })
    document.querySelector('.left').addEventListener("mouseup", () => {
        const keyUpLeftEvent = new KeyboardEvent("keyup", {
            code: "ArrowLeft",
        });
        document.dispatchEvent(keyUpLeftEvent);
    })

    //keyright
    document.querySelector('.right').addEventListener("mousedown", () => {
        const keyDownRightEvent = new KeyboardEvent("keydown", {
            code: "ArrowRight",
        });
        document.dispatchEvent(keyDownRightEvent);
    })
    document.querySelector('.right').addEventListener("mouseup", () => {
        const keyUpRightEvent = new KeyboardEvent("keyup", {
            code: "ArrowRight",
        });
        document.dispatchEvent(keyUpRightEvent);
    })
    //keyspace
    document.querySelector('.space').addEventListener("mousedown", () => {
        const keyDownSpaceEvent = new KeyboardEvent("keydown", {
            code: "Space",
        });
        document.dispatchEvent(keyDownSpaceEvent);
    })
    document.querySelector('.space').addEventListener("mouseup", () => {
        const keyUpSpaceEvent = new KeyboardEvent("keyup", {
            code: "Space",
        });
        document.dispatchEvent(keyUpSpaceEvent);
    })

        /*Arrow keys handling*/
        document.addEventListener("keydown", (event) => {
            switch (event.code) {
                case "ArrowUp":
                    upKeyPressed = true
                    game.player.directionY = -1.8
                    game.player.currentDirection = "up"
                    break;
                case "ArrowDown":
                    downKeyPressed = true
                    game.player.directionY = 1.8
                    game.player.currentDirection = "down"
                    break;
                case "ArrowLeft":
                    leftKeyPressed = true
                    game.player.directionX = -1.8
                    game.player.currentDirection = "left"
                    game.player.playerImg.removeAttribute('class')
                    game.player.playerImg.classList.add('character-move-left')
                    break;
                case "ArrowRight":
                    rightKeyPressed = true
                    game.player.directionX = 1.8
                    game.player.currentDirection = "right"
                    game.player.playerImg.removeAttribute('class')
                    game.player.playerImg.classList.add('character-move-right')
                    break;
            }
            if (game.player) {
                if (event.code === "Space" && !shootOnce) {
                    game.player.shoot()
                    if (game.player.currentDirection === "right") {

                        game.player.playerImg.classList.add('character-shooting-right')
                        setTimeout(() => {
                            game.player.playerImg.classList.remove('character-shooting-right')
                        }, 290)
                    }
                    else {

                        game.player.playerImg.classList.add('character-shooting-left')
                        setTimeout(() => {
                            game.player.playerImg.classList.remove('character-shooting-left')
                        }, 290)
                    }
                    shootOnce = true
                }
            }
        }
        )

        //on keyUp, set the playerdirection 
        document.addEventListener("keyup", (event) => {
            const keyUp = event.code
            if (keyUp === "ArrowUp") {
                upKeyPressed = false
                if (downKeyPressed) {
                    game.player.directionY = 1.8
                } else {

                    game.player.directionY = 0
                }
            }
            if (keyUp === "ArrowDown") {
                downKeyPressed = false
                if (upKeyPressed) {
                    game.player.directionY = -1.8
                } else {

                    game.player.directionY = 0
                }
            }
            if (keyUp === "ArrowLeft") {
                leftKeyPressed = false
                if (rightKeyPressed) {
                    game.player.directionX = 1.8
                } else {
                    game.player.directionX = 0
                    game.player.playerImg.removeAttribute('class')
                    game.player.playerImg.classList.add('character-not-moving-left')


                }
            }
            if (keyUp === "ArrowRight") {
                rightKeyPressed = false
                if (leftKeyPressed) {
                    game.player.directionX = -1.8
                } else {
                    game.player.directionX = 0
                    game.player.playerImg.removeAttribute('class')
                    game.player.playerImg.classList.add('character-not-moving-right')

                }
            }
            if (event.code === "Space") {
                shootOnce = false
            }
        })


    restartButton.addEventListener('click', () => {
        location.reload()
    })

})
