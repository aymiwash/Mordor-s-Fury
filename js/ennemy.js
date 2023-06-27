class Ennemy {
    constructor(maxTop, maxLeft) {
        this.ennemy = document.createElement("div")
        this.ennemyClass = this.ennemy.classList.add("ennemy")
        this.ennemyImg = document.createElement('img')
        this.ennemyImg.src = "./images/orcs.png"
        this.ennemyImg.classList.add('ennemyMoveLeft')
        this.ennemy.append(this.ennemyImg)
        this.maxTop = maxTop
        this.maxLeft = maxLeft
        this.top = 0
        this.left = 0
        this.width = 37
        this.height = 55
        this.directionX = 0
        this.directionY = 0
        this.health = 10
        this.ennemy.style.position = "absolute"
    }

    ennemyAppears() {


        //take a random integer between 1 and 4 included refering to the 4 sides of gameScreen
        const randomSide = Math.ceil(Math.random() * 4)
        //random between gameScreen size
        const randomTop = Math.floor(Math.random() * this.maxTop)
        const randomLeft = Math.floor(Math.random() * this.maxLeft)

        if (randomSide === 1) {
            this.left = 0 - this.width
            this.top = randomTop
        } if (randomSide === 2) {
            this.top = 0 - this.height
            this.left = randomLeft
        } if (randomSide === 3) {
            this.left = this.maxLeft
            this.top = randomTop
        }
        if (randomSide === 4) {
            this.top = this.maxTop
            this.left = randomLeft
        }
        

        document.querySelector("#game-screen").append(this.ennemy)
        this.ennemy.style.width = `${this.width}px`
        this.ennemy.style.height = `${this.height}px`
        this.ennemy
        this.ennemyClass

    }

    ennemyMovement() {
        this.top += this.directionY
        this.left += this.directionX
        this.updatingEnnemyPosition()
    }

    updatingEnnemyPosition() {
        this.ennemy.style.top = `${this.top}px`
        this.ennemy.style.left = `${this.left}px`
    }

}