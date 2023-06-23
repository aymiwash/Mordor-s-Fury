class Game {
    constructor() {
        this.gameScreen = document.querySelector("#game-screen")
        this.startScreen = document.querySelector("#start-screen")
        this.endScreen = document.querySelector("#end-screen")
        this.level = document.querySelector("#level")
        this.health = document.querySelector("#health")
        this.score = document.querySelector("#score")
        this.width = 450
        this.height = 450
        this.player = new Player(this.gameScreen)
        this.ennemies = []
    }

    start() {
        //hiding startscreen
        this.startScreen.style.display = "none"

        // making player appear
        this.player.playerDiv.style.width = `${this.player.width}px`
        this.player.playerDiv.style.height = `${this.player.height}px`
        this.player.move()

        

        for(let i = 0; i < 5; i ++){
            const ennemy = new Ennemy(this.height, this.width)
            this.ennemies.push(ennemy)
        }

        this.ennemies.forEach((ennemy)=>{
            ennemy.ennemyAppears()
        })

        this.gameLoop()

    }

    gameLoop() {
        this.player.move()
        this.ennemies.forEach((ennemy) => {
            ennemy.ennemyMovement()
        })

        this.ennemies.forEach((ennemy) => {
            const randomSpeed = Math.random()
            if (this.player.top > ennemy.top) {
                ennemy.directionY = randomSpeed
            }
            if (this.player.top < ennemy.top) {
                ennemy.directionY = -randomSpeed
            }
            if (this.player.left > ennemy.left) {
                ennemy.directionX = randomSpeed
            }
            if (this.player.left < ennemy.left) {
                ennemy.directionX = -randomSpeed
            }
        })

        this.player.projectiles.forEach((projectile, index) => {
            projectile.projectileMovement()
            if (projectile.top < 0 + projectile.height || projectile.top > 450 || projectile.left < 0 + projectile.width || projectile.left > 450) {
                this.player.projectiles.splice(index, 1)
            }
        })




        requestAnimationFrame(() => this.gameLoop())
    }


}