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
        this.currentDirection = ""
        this.directionXOfProj = 7
        this.directionYOfProj = 0
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

        if (this.directionX === 0 && this.directionY === 0) {
            if (this.currentDirection === "left") {
                this.directionXOfProj = -7
                this.directionYOfProj = 0
            }
            if (this.currentDirection === "right") {
                this.directionXOfProj = 7
                this.directionYOfProj = 0
            }
            if (this.currentDirection === "up") {
                this.directionYOfProj = -7
                this.directionXOfProj = 0
            }
            if (this.currentDirection === "down") {
                this.directionYOfProj = 7
                this.directionXOfProj = 0
            }
        }

        if (this.directionX < 0) {
            this.directionXOfProj = -7
        }
        if (this.directionX > 0) {
            this.directionXOfProj = 7
        }
        if (this.directionY < 0) {
            this.directionYOfProj = -7
        }
        if (this.directionY > 0) {
            this.directionYOfProj = 7
        }



        const projectile = new Projectile(middleTop, middleLeft, this.directionXOfProj, this.directionYOfProj)
        this.projectiles.push(projectile)


        projectile.projectileShot()


        //when player isnt moving


        //direction and speed of projectile




    }

    updatePosition() {
        this.playerDiv.style.top = `${this.top}px`
        this.playerDiv.style.left = `${this.left}px`
    }

}