class Projectile {
    constructor(playerTop, playerLeft, directionX, directionY, gameScreen) {
        this.gameScreen = gameScreen
        this.player = player
        this.projectile = document.createElement("div")
        this.projectile.classList.add('projectile')
        this.shootSound = new Audio("./sounds/fireball-sound.mp3")
        this.top = playerTop
        this.left = playerLeft
        this.width = 10
        this.height = 3
        this.directionX = directionX
        this.directionY = directionY
        this.projectile.style.position = "absolute"

    }

    projectileShot() {
        //Start position
        this.shootSound.play()
        this.shootSound.volume = 0.3
        this.projectile
        this.projectileClass
        document.querySelector("#game-screen").append(this.projectile)
        this.projectile.style.width = `${this.width}px`
        this.projectile.style.height = `${this.height}px`
    }

    projectileMovement() { 
        //direction of shoot
        this.top += this.directionY
        this.left += this.directionX

        //if out of gamescreen, projectile deleted from html
        if (this.top < 0 + this.height) {
            this.projectile.remove()
        }
        if (this.top > this.gameScreen.height) {
            this.projectile.remove()
        }
        if (this.left < 0 + this.width) {
            this.projectile.remove()
        }
        if (this.left > this.gameScreen.width) {
            this.projectile.remove()
        }


        this.updateProjectilePosition()
    }

    updateProjectilePosition() {
        this.projectile.style.top = `${this.top}px`
        this.projectile.style.left = `${this.left}px`
    }
}
