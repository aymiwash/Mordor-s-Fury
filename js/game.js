class Game {
    constructor() {
        this.gameScreen = document.querySelector("#game-screen")
        this.startScreen = document.querySelector("#start-screen")
        this.endScreen = document.querySelector("#end-screen")
        this.levelDiv = document.querySelector("#level")
        this.healthDiv = document.querySelector("#health")
        this.scoreDiv = document.querySelector("#score")
        this.score = 0
        this.scoreIn5Digits = []
        this.width = 550
        this.height = 550
        this.player = new Player(this.gameScreen)
        this.ennemies = []
        this.intervalID = 0
        this.intervalIDOfLoop = 0
        this.ennemiesWave = 0
        //this.introAudio = document.querySelector("#intro-audio")
        this.fightAudio = new Audio("./sounds/fight-audio.mp3")
        this.volume = 0.4
        this.ennemySpeed = 0.4
    }



    start() {
        //hiding startscreen
        this.startScreen.style.display = "none"
        //this.introAudio.pause()
        this.fightAudio.play()
        this.fightAudio.volume = this.volume


        // making player appear
        this.player.playerDiv.style.width = `${this.player.width}px`
        this.player.playerDiv.style.height = `${this.player.height}px`
        this.player.playerDiv.style.display = "block"
        this.player.move()

        this.intervalID = setInterval(() => {
            for (let i = 0; i < 5 + this.ennemiesWave; i++) {
                const ennemy = new Ennemy(this.height, this.width)
                this.ennemies.push(ennemy)
                ennemy.ennemyAppears()
            }
            this.ennemySpeed += 0.1
            this.ennemiesWave += 1

        }, 5000)

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
                }
            })
        })
        
    }

    // displayScore5Digits(){
    //     console.log(this.scoreIn5Digits);
    //     for(let i = 0 ; i < this.score.length; i ++){
    //         this.scoreIn5Digits.push(this.score[i])
    //     }
    //     // while(this.scoreIn5Digits.length < 5){
    //     //     this.scoreIn5Digits.unshift(0)
    //     // }
    //     const scoreToDisplay = this.scoreIn5Digits.join("")
    //     console.log(this.score, scoreToDisplay)

    //     this.scoreDiv.textContent = `Score: ${scoreToDisplay}`
    // }

    //deals 10 dmg to player when ennemy hit him
    didEnnemyHitPlayer() {
        this.ennemies.forEach((ennemy, indexE) => {
            if (this.player.left < ennemy.left + ennemy.width && this.player.left + this.player.width > ennemy.left && this.player.top + this.player.height > ennemy.top && this.player.top < ennemy.top + ennemy.width) {
                ennemy.ennemy.remove()
                this.ennemies.splice(indexE, 1)
                this.player.health -= 10
            }

        })
    }

    gameLoop() {

        this.intervalIDOfLoop = setInterval(() => {

            this.player.playerHealth.textContent = `Health ${this.player.health}/100`


            //player movement
            this.player.move()
            //ennemies movement
            this.ennemies.forEach((ennemy) => {
                ennemy.ennemyMovement()
            })

            this.ennemies.forEach((ennemy) => {
                const randomSpeed = Math.random() * this.ennemySpeed
                if (this.player.top > ennemy.top) {
                    ennemy.directionY = randomSpeed
                }
                if (this.player.top < ennemy.top) {
                    ennemy.directionY = -randomSpeed
                }
                if (this.player.left > ennemy.left) {
                    ennemy.directionX = randomSpeed
                    ennemy.ennemyImg.removeAttribute('class')
                    ennemy.ennemyImg.classList.add('ennemyMoveRight')
                }
                if (this.player.left + this.player.width < ennemy.left) {
                    ennemy.directionX = -randomSpeed
                    ennemy.ennemyImg.removeAttribute('class')
                    ennemy.ennemyImg.classList.add('ennemyMoveLeft')
                }
            })

            //projectiles movement
            this.player.projectiles.forEach((projectile, index) => {
                projectile.projectileMovement()
                if (projectile.top < 0 + projectile.height || projectile.top > this.height || projectile.left < 0 + projectile.width || projectile.left > this.width) {
                    this.player.projectiles.splice(index, 1)
                }
            })

            //score updates
            //this.displayScore5Digits()

            //collisions
            this.didProjectileHitEnnemy()
            this.didEnnemyHitPlayer()

            //player dies
            if (this.player.health <= 0) {
                clearInterval(this.intervalID)
                clearInterval(this.intervalIDOfLoop)

                this.ennemies.forEach((ennemy) => {
                    ennemy.ennemy.remove()
                })
                this.player.projectiles.forEach((projectile) => {
                    projectile.projectile.remove()
                })
                this.player.playerDiv.remove()
                delete this.player
                delete this.ennemies
                this.endScreen.style.display = "flex"
                const endScore = document.querySelector(".score-screen")
                endScore.textContent = `Your score is ${this.score}`
                this.fightAudio.pause()
            }

        }, 6)
    }


}