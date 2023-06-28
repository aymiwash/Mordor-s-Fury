class Projectile {
    constructor(playerTop, playerLeft, directionX, directionY, gameScreen) {
        this.gameScreen = gameScreen
        this.player = player
        this.projectile = document.createElement("div")
        this.projectileImg = document.createElement("img")
        this.projectileImg.src = "./images/fireball.png"
        this.projectile.append(this.projectileImg)
        this.projectile.classList.add('projectile')
        this.shootSound = new Audio("./sounds/fireball-sound.mp3")
        this.playerTop = playerTop
        this.playerLeft = playerLeft
        this.top = this.playerTop
        this.left = this.playerLeft
        this.width = 44
        this.height = 20
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


        //direction of shoot

        if (this.directionX < 0) {
            if (this.directionY < 0) {
                this.top = this.playerTop + this.height
                this.projectile.style.scale = "-1 1"
                this.projectile.style.transform = "rotate(-45deg)"
            }
            else if (this.directionY > 0) {
                this.left = this.playerLeft - this.width/2
                this.projectile.style.scale = "-1 1"
                this.projectile.style.transform = "rotate(45deg)"
            } else {
                this.projectile.style.scale = "-1 1"
                this.projectile.style.transform = "rotate(0deg)"
            }
        }
        else if (this.directionX > 0) {
            if (this.directionY < 0) {
                this.left = this.playerLeft - this.width/2
                this.projectile.style.scale = "1 1"
                this.projectile.style.transform = "rotate(-45deg)"
            }
            else if (this.directionY > 0) {
                this.left = this.playerLeft - this.width/2
                this.projectile.style.scale = "1 1"
                this.projectile.style.transform = "rotate(45deg)"
            } else {
                this.projectile.style.scale = "1 1"
                this.projectile.style.transform = "rotate(0deg)"
            }
        }
        else if (this.directionY < 0) {
            this.left = this.playerLeft - this.width/2
            this.projectile.style.scale = "1 1"
            this.projectile.style.transform = "rotate(-90deg)"
        }
        else if (this.directionY > 0) {
            this.left = this.playerLeft - this.width/2
            this.projectile.style.scale = "1 1"
            this.projectile.style.transform = "rotate(90deg)"
        }



    }

    projectileMovement() {


        this.top += this.directionY
        this.left += this.directionX

        //if out of gamescreen, projectile deleted from html
        if (this.top < 0 + this.height) {
            this.projectile.remove()
        }
        if (this.top > 550) {
            this.projectile.remove()
        }
        if (this.left < 0 + this.width) {
            this.projectile.remove()
        }
        if (this.left > 550) {
            this.projectile.remove()
        }


        this.updateProjectilePosition()
    }

    updateProjectilePosition() {
        this.projectile.style.top = `${this.top}px`
        this.projectile.style.left = `${this.left}px`
    }
}
