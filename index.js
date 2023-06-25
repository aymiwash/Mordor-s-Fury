
window.addEventListener('load', () => {

    const startButton = document.querySelector("#start-button")
    const restartButton = document.querySelector('#restart-button')
    const endScore = document.querySelector(".score-screen")
    let game
    let shootOnce = false
    let leftKeyPressed = false
    let rightKeyPressed = false
    let upKeyPressed = false
    let downKeyPressed = false


    /*Starting game*/
    startButton.addEventListener("click", () => {
        game = new Game
        game.start()
    })

    /*Arrow keys handling*/
    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp":
                upKeyPressed = true
                game.player.directionY = -2
                game.player.currentDirection = "up"
                break;
            case "ArrowDown":
                downKeyPressed = true
                game.player.directionY = 2
                game.player.currentDirection = "down"
                break;
            case "ArrowLeft":
                leftKeyPressed = true
                game.player.directionX = -2
                game.player.currentDirection = "left"
                break;
            case "ArrowRight":
                rightKeyPressed = true
                game.player.directionX = 2
                game.player.currentDirection = "right"
                break;
        }

        if (event.code === "Space" && !shootOnce) {
            game.player.shoot()
            shootOnce = true
        }    }
    )

    //on keyUp, set the playerdirection 
    document.addEventListener("keyup", (event) => {
        const keyUp = event.key
        if(keyUp === "ArrowUp"){
            upKeyPressed = false
            if(downKeyPressed){
                game.player.directionY = 2
            }else{
                
                game.player.directionY = 0
            }
        }
        if(keyUp === "ArrowDown"){
            downKeyPressed = false
            if(upKeyPressed){
                game.player.directionY = -2
            }else{
                
                game.player.directionY = 0
            }
        }
        if(keyUp === "ArrowLeft"){
            leftKeyPressed = false
            if(rightKeyPressed){
                game.player.directionX = 2
            }else{
                game.player.directionX = 0
                
            }
        }
        if(keyUp === "ArrowRight"){
            rightKeyPressed = false
            if(leftKeyPressed){
                game.player.directionX = -2
            }else{
                game.player.directionX = 0
                
            }
        }
        if(event.code === "Space"){
            shootOnce = false
        }
    })
    
    restartButton.addEventListener('click', ()=>{
        location.reload()
    })

})
