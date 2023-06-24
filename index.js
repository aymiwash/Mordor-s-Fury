
window.addEventListener('load', () => {

    const startButton = document.querySelector("#start-button")
    const player = document.querySelector("#player")
    let game
    let shootOnce = false


    /*Starting game*/
    startButton.addEventListener("click", () => {
        game = new Game
        game.start()
    })

    /*Arrow keys handling*/
    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp":
                game.player.directionY = -2;
                break;
            case "ArrowDown":
                game.player.directionY = 2
                break;
            case "ArrowLeft":
                game.player.directionX = -2
                break;
            case "ArrowRight":
                game.player.directionX = 2
                break;
        }

        if (event.code === "Space" && !shootOnce) {
            game.player.shoot()
            shootOnce = true
        }

    }
    )

    document.addEventListener("keyup", (event) => {
        switch (event.key) {
            case "ArrowUp":
                game.player.directionY = 0
                game.player.currentDirection = "up"
                break;
            case "ArrowDown":
                game.player.directionY = 0
                game.player.currentDirection = "down"
                break;
            case "ArrowLeft":
                game.player.directionX = 0
                game.player.currentDirection = "left"
                break;
            case "ArrowRight":
                game.player.directionX = 0
                game.player.currentDirection = "right"
                break;
        }

        if(event.code === "Space"){
            shootOnce = false
        }

    })

})
