# MORDOR'S FURY

[Play the game here !](https://aymiwash.github.io/Mordor-s-Fury/)

## DESCRIPTION

Mordor's Fury is a shooting game where the player try to kill Orcs that Saruman invokes.
Orcs randomly spawn from each sides of the screen and the player has to attack them with his fire shots. The more he kills, the more you score but also, the more difficulty increase.
The game ends when the player has lost all his health points.

## MAIN FUNCTIONNALITIES

- The player can move in all directions using the arrow keys on the keyboard.
- The player can shoot fireballs with the spacebar of the keyboard.
- Enemies appear randomly from each side of the game screen.
- Enemies move towards the player as long as they are alive.
- Every 4 seconds, a new wave of enemies appears.
- Hitting enemies with fireballs makes them disappear and increases the score.
- When the player gets hit by an enemy, he loses health points.
- As the game progresses, the waves of enemies become more challenging increasing the amount of ennemies and their speed.
- The game ends when the player runs out of health points.
- The end screen is displayed, showing the player's score.

## BACKLOG FUNCTIONNALITIES

- Adding a boss after few ennemies waves
- Adding new monsters with different patterns
- Adding more weapons for the player
- Adding bonus for player

## TECHNOLOGIES USED

- HTML
- CSS
- JAVASCRIPT

## STATES

- Start screen
- Game screen
- End screen

## STRUCTURE

### game.js

- Game()
    - this.gameScreen
    - this.startScreen
    - this.endScreen
    - this.levelDiv
    - this.healthDiv
    - this.scoreDiv
    - this.score
    - this.scoreIn5Digits
    - this.width
    - this.height
    - this.player
    - this.ennemies
    - this.intervalID
    - this.intervalIDOfLoop
    - this.ennemiesWave
    - this.introAudio
    - this.fightAudio
    - this.volume
    - this.ennemySpeed

- start()
- didProjectileHitEnnemy()
- displayScore5Digits()
- didEnnemyHitPlayer()
- gameLoop()

### player.js

- Player()
    - this.gameScreen
    - this.playerDiv
    - this.playerImg
    - this.playerImg.src
    - this.lifeBar
    - this.health
    - this.experience
    - this.top
    - this.left
    - this.width
    - this.height
    - this.directionX
    - this.directionY
    - this.currentDirection
    - this.directionXOfProj
    - this.directionYOfProj
    - this.score
    - this.projectiles
    - this.gameScreenHeight
    - this.gameScreenWidth

- move()
- shoot()
- updatePosition()

### ennemy.js

- Ennemy()
    - this.ennemy
    - this.ennemyClass
    - this.ennemyImg
    - this.ennemyImg.src
    - this.maxTop
    - this.maxLeft
    - this.top
    - this.left
    - this.width
    - this.height
    - this.directionX
    - this.directionY
    - this.health
    - this.ennemy.style.position
    - this.ennemyDead

- ennemyAppears()
- ennemyMovement()
- isEnnemyDead()
- updatingEnnemyPosition()

### projectile.js

- Projectile()
    - this.gameScreen
    - this.player
    - this.projectile
    - this.projectileImg
    - this.projectileImg.src
    - this.shootSound
    - this.playerTop
    - this.playerLeft
    - this.top
    - this.left
    - this.width
    - this.height
    - this.directionX
    - this.directionY
    - this.projectile.style.position

- projectileShot()
- projectileMovement()
- updateProjectilePosition()
