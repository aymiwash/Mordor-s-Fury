class Game {
    constructor() {
        this.gameScreen = document.querySelector("#game-screen")
        this.startScreen = document.querySelector("#start-screen")
        this.endScreen = document.querySelector("#end-screen")
        this.levelDiv = document.querySelector("#level")
        this.healthDiv = document.querySelector("#health")
        this.scoreDiv = document.querySelector("#score")
        this.score = 0
        this.scoreIn5Digits = ["","", "", "", ""]
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
        this.player.lifeBar.style.tranform = "translateX(-100px)"
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
                if (projectile.left < ennemy.left + ennemy.width / 2 && projectile.left + projectile.width > ennemy.left + ennemy.width / 2 && projectile.top + projectile.height > ennemy.top && projectile.top < ennemy.top + ennemy.width) {
                    ennemy.ennemyDead = true
                    projectile.projectile.remove()
                    this.player.projectiles.splice(indexP, 1)
                    this.score += 10

                    //explosion sprite then delete ennemy div after 300ms
                    ennemy.ennemyImg.remove()
                    ennemy.ennemy.style.height = "47px"
                    ennemy.ennemy.style.width = "34px"
                    const ennemyDying = document.createElement('img')
                    ennemyDying.classList.add("ennemy-dies")
                    ennemyDying.src = "./images/firebullet-effects.png"
                    ennemy.ennemy.append(ennemyDying)
                    this.ennemies.splice(indexE, 1)
                    ennemy.isEnnemyDead()

                }
            })
        })

    }

    displayScore5Digits(){
        if(this.score.toString().length < 5 ){
        let arrayOfScore = this.score.toString().split("").reverse()
        for(let i = 0 ; i < 5; i ++){
            if(arrayOfScore[i]){
                this.scoreIn5Digits[i] = arrayOfScore[i]
            }else{
                this.scoreIn5Digits[i]="0"
            }
        }   
        const scoreToDisplay = this.scoreIn5Digits.reverse().join('')
        this.scoreDiv.textContent = `Score: ${scoreToDisplay}`
        }
        else{
            this.scoreDiv.textContent = `Score: ${this.score}`
        }
        
    }


    //deals 10 dmg to player when ennemy hit him
    didEnnemyHitPlayer() {
        this.ennemies.forEach((ennemy, indexE) => {
            if (this.player.left < ennemy.left + ennemy.width && this.player.left + this.player.width > ennemy.left && this.player.top + this.player.height > ennemy.top && this.player.top < ennemy.top + ennemy.width) {
                ennemy.ennemy.remove()
                this.ennemies.splice(indexE, 1)
                this.player.health -= 10
            }
        })

        //lifebar update
        if (this.player.health < 80) {
            this.player.lifeBar.classList.add("life-bar80")
        }
        if (this.player.health < 65) {
            this.player.lifeBar.classList.add("life-bar65")
        }
        if (this.player.health < 50) {
            this.player.lifeBar.classList.add("life-bar50")
        }
        if (this.player.health < 30) {
            this.player.lifeBar.classList.add("life-bar30")
        }
        if (this.player.health < 15) {
            this.player.lifeBar.classList.add("life-bar15")
        }

    }

    gameLoop() {

        this.intervalIDOfLoop = setInterval(() => {

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
            this.displayScore5Digits()
            //this.displayScore5Digits()

            //collisions
            this.didProjectileHitEnnemy()
            this.didEnnemyHitPlayer()

            //player dies
            if (this.player.health <= 0) {
                this.player.lifeBar.classList.add("life-bar0")

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