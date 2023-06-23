class Projectile {
    constructor(playerTop, playerLeft) {
        this.player = player
        this.projectile = document.createElement("div")
        this.projectile.classList.add('projectile')
        this.top = playerTop
        this.left = playerLeft
        this.width = 10
        this.height = 3
        this.directionX = 0
        this.directionY = 0
        this.projectile.style.position = "absolute"

    }

    projectileShot() {
        //Start position
        this.projectile
        this.projectileClass
        document.querySelector("#game-screen").append(this.projectile)
        this.projectile.style.width = `${this.width}px`
        this.projectile.style.height = `${this.height}px`
    }

    projectileMovement() { //direction of shoot
        this.top += this.directionY
        this.left += this.directionX
        if(this.top < 0 + this.height){
            this.projectile.remove()
        }
        if(this.top > 450){
            this.projectile.remove()
        }
        if(this.left < 0 + this.width){
            this.projectile.remove()
        }
        if(this.left > 450){
            this.projectile.remove()
        }
        

        this.updateProjectilePosition()
    }

    updateProjectilePosition() {
        this.projectile.style.top = `${this.top}px`
        this.projectile.style.left = `${this.left}px`
    }
}

class Player {
    constructor(gameScreen) {
        this.gameScreen = gameScreen
        this.playerDiv = document.querySelector('#player')
        this.health = 100
        this.level = 0
        this.experience = 0
        this.top = 218
        this.left = 218
        this.width = 23
        this.height = 30
        this.directionX = 0
        this.directionY = 0
        this.score = 0
        this.projectiles = []
        this.projectile = new Projectile(this.top, this.left)
    }

    move() {
        this.left += this.directionX
        this.top += this.directionY
        //Setting border limits for player movement
        if (this.top < 0) {
            this.top = 0
        }
        if (this.top > 450 - this.height) {
            this.top = 450 - this.height
        }
        if (this.left < 0) {
            this.left = 0
        }
        if (this.left > 450 - this.width) {
            this.left = 450 - this.width
        }

        this.updatePosition()
    }

    shoot() {
        //projectile spawn
        const middleTop = this.top + this.height / 2
        const middleLeft = this.left + this.width / 2
        const projectile = new Projectile(middleTop, middleLeft)
        this.projectiles.push(projectile)
        projectile.projectileShot()

        //direction and speed of projectile
        if(this.directionX === 0 && this.directionY === 0){
            projectile.directionX = 7
        }
        if(this.directionX < 0){
            projectile.directionX = -7
        }if(this.directionX > 0){
            projectile.directionX = 7
        }
        if(this.directionY < 0){
            projectile.directionY = -7
        }
        if(this.directionY > 0){
            projectile.directionY = 7
        }
    }

    updatePosition() {
        this.playerDiv.style.top = `${this.top}px`
        this.playerDiv.style.left = `${this.left}px`
    }

}