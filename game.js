class Game {
    constructor() {
        this.gameScreen = document.querySelector("#game-screen")
        this.startScreen = document.querySelector("#start-screen")
        this.endScreen = document.querySelector("#end-screen")
        this.levelDiv = document.querySelector("#level")
        this.healthDiv = document.querySelector("#health")
        this.scoreDiv = document.querySelector("#score")
        this.score = 0
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



        for (let i = 0; i < 5; i++) {
            const ennemy = new Ennemy(this.height, this.width)
            this.ennemies.push(ennemy)
        }
        this.ennemies.forEach((ennemy) => {
            ennemy.ennemyAppears()
        })
        this.gameLoop()
    }

    //remove projectile and ennemy if he's touch by projectile
    didProjectileHitEnnemy() {
        this.ennemies.forEach((ennemy, indexE) => {
            this.player.projectiles.forEach((projectile, indexP) => {
                if (projectile.left < ennemy.left + ennemy.width && projectile.left + projectile.width > ennemy.left && projectile.top + projectile.height > ennemy.top && projectile.top < ennemy.top + ennemy.width) {
                    ennemy.ennemy.remove()
                    projectile.projectile.remove()
                    this.ennemies.splice(indexE, 1)
                    this.player.projectiles.splice(indexP, 1)
                    this.score += 10
                    this.scoreDiv.textContent = this.score
                }
            })
        })
    }

    //deals 10 dmg to player when ennemy hit him
    didEnnemyHitPlayer() {
        this.ennemies.forEach((ennemy, indexE) => {
            if (this.player.left < ennemy.left + ennemy.width && this.player.left + this.player.width > ennemy.left && this.player.top + this.player.height > ennemy.top && this.player.top < ennemy.top + ennemy.width) {
                ennemy.ennemy.remove()
                this.ennemies.splice(indexE, 1)
                this.player.health -= 10

                console.log(this.player.health);
            }

        })
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
        this.didProjectileHitEnnemy()
        this.didEnnemyHitPlayer()




        requestAnimationFrame(() => this.gameLoop())
    }


}