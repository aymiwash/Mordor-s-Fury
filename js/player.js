class Player {
    constructor(gameScreen) {
        this.gameScreen = gameScreen
        this.playerDiv = document.querySelector('#player')
        this.playerImg = document.createElement('img')
        this.playerImg.src = "./images/character.png"
        this.playerImg.classList.add('character-not-moving-right')
        this.playerDiv.append(this.playerImg)
        this.lifeBar = document.querySelector(".life-bar")
        this.health = 6
        this.hurtSound = new Audio("./sounds/hurt-sound.mp3")
        this.experience = 0
        this.top = 260
        this.left = 260
        this.width = 40
        this.height = 60
        this.directionX = 0
        this.directionY = 0
        this.currentDirection = ""
        this.directionXOfProj = 0
        this.directionYOfProj = 0
        this.score = 0
        this.projectiles = []
    }

    move() {
        this.left += this.directionX
        this.top += this.directionY

        //Setting border limits for player movement
        if (this.top < 0) {
            this.top = 0
        }
        if (this.top > 550 - this.height) {
            this.top = 550 - this.height
        }
        if (this.left < 0) {
            this.left = 0
        }
        if (this.left > 550 - this.width) {
            this.left = 550 - this.width
        }

        this.updatePosition()
    }

    shoot() {

        //direction of projectile when player doesnt move
        if (this.directionX === 0 && this.directionY === 0) {
            if (this.currentDirection === "left") {
                this.directionXOfProj = -5
                this.directionYOfProj = 0
            }
            if (this.currentDirection === "right") {
                this.directionXOfProj = 5
                this.directionYOfProj = 0
            }
            if (this.currentDirection === "up") {
                this.directionYOfProj = -5
                this.directionXOfProj = 0
            }
            if (this.currentDirection === "down") {
                this.directionYOfProj = 5
                this.directionXOfProj = 0
            }
            else if (this.currentDirection === "") {
                this.directionXOfProj = 5
                this.directionYOfProj = 0
            }
        }

        //direction of projectile when player moves
        if (this.directionX < 0) {
            if (this.directionY === 0) {
                this.directionYOfProj = 0
            }
            this.directionXOfProj = -6
        }
        if (this.directionX > 0) {
            if (this.directionY === 0) {
                this.directionYOfProj = 0
            }
            this.directionXOfProj = 6
        }
        if (this.directionY < 0) {
            if (this.directionX === 0) {
                this.directionXOfProj = 0
            }
            this.directionYOfProj = -6
        }
        if (this.directionY > 0) {
            if (this.directionX === 0) {
                this.directionXOfProj = 0
            }
            this.directionYOfProj = 6
        }

        //projectile spawn
        const middleTop = this.top + this.height / 2
        const middleLeft = this.left + this.width / 2

        //creation of projectile
        const projectile = new Projectile(middleTop, middleLeft, this.directionXOfProj, this.directionYOfProj, this.gameScreen)
        this.projectiles.push(projectile)
        projectile.projectileShot()
    }

    updatePosition() {
        this.playerDiv.style.top = `${this.top}px`
        this.playerDiv.style.left = `${this.left}px`
    }

}