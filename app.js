const game = document.getElementById('canvas')
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
const movement = document.getElementById('movement')
const glovePic = document.getElementById('glove')
const ctx = game.getContext('2d')
let isGloved = false
let playerHealth = 100
let spriteDirection = 'left'
class MugMen {
    constructor(x, y, color, height, width) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.height = height,
        this.width = width,
        this.alive = true,
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.height, this.width)
        }
    }
}

// You could also use this function syntax, to create objects
// function MugMen(x, y, color, height, width) {
// 	this.x = x
// 	this.y = y
// 	this.color = color
// 	this.height = height
// 	this.width = width
// 	this.alive = true
// 	this.render = function () {
// 		ctx.fillStyle = this.color
// 		ctx.fillRect(this.x, this.y, this.height, this.width)
// 	}
// }
 const drawGlove = () => {
 ctx.drawImage(
    glovePic, 50, 50
)}
let player = new MugMen(15, 15, 'blue', 15, 15)
let mug = new MugMen(600, 300, 'brown', 30, 65)
let glove = new MugMen(50, 50, 'transparent', 20,20 )
let sprite = new MugMen(200, 200, 'limegreen', 30, 65)
let borderLeft = new MugMen(0, 0, 'red', 5, 900)
let borderRight = new MugMen(795, 0, 'red', 5, 900)
let borderUp = new MugMen(0,0,'red',900,5)
let borderDown = new MugMen(0,395,'red',900,5)
document.addEventListener('DOMContentLoaded', function () {
    
    document.addEventListener('keydown', movementHandler)
    setInterval(gameLoop, 60)
    drawGlove()
})

const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height)
    movement.textContent = player.x + ', ' + player.y
    document.getElementById('health').textContent = playerHealth
    // player.render()
    if (player.alive) {
        player.render()
        // document.getElementById('health').textContent = playerHealth
    }
    if (sprite.alive){
        detectSpriteHit()
        spritePath()
        borderLeftHit()
        borderRightHit()
    }
    if (mug.alive) {
        detectMugHit()
    }
    if (glove.alive){
        detectGloveHit()
    }
    if (sprite.alive){
        sprite.render()
    }
    if (mug.alive) {
        mug.render()
    }
    if (glove.alive){
        drawGlove()
        glove.render()
    }
    if (playerHealth === 0) {
        player.alive = false
        // document.getElementById('status').textContent = 'you die by a sprite!'
    }
    if (borderLeft.alive){
        borderLeft.render()
    }
    if (borderRight.alive){
        borderRight.render()
    }
    if (borderUp.alive){
        borderUp.render()
    }
    if (borderDown.alive){
        borderDown.render()
    }
}
const movementHandler = (e) => {
    if (player.alive === true) {
    switch (e.keyCode) {
        case (87):
            player.y -= 5
            break
        case (65):
            player.x -= 5
            //sprite.x -= 10
            break
        case (83):
            player.y += 5
            break
        case (68):
            player.x += 5
            //sprite.x += 10
            break
        }
    }
    else {
        return false
    }
}
const spritePath = () => {
    if (spriteDirection === 'right'){
        sprite.x += 5
    }
    else if (spriteDirection === 'left') {
        sprite.x -= 5
    }
}
const detectMugHit = () => {
    if (player.x < mug.x + mug.width
        && player.x + player.width > mug.x
        && player.y < mug.y + mug.height
        && player.y + player.height > mug.y) {
            mug.alive = false
            document.getElementById('status').textContent = 'You save a mug!'
        }
}
const detectGloveHit = () => {
    if (player.x < glove.x + glove.width
        && player.x + player.width > glove.x
        && player.y < glove.y + glove.height
        && player.y + player.height > glove.y) {
            glove.alive = false
            document.getElementById('status').textContent = 'You have a glove!'
            isGloved = true
        }
}
const detectSpriteHit = () => {
    if (player.x < sprite.x + sprite.width
        && player.x + player.width > sprite.x
        && player.y < sprite.y + sprite.height
        && player.y + player.height > sprite.y
        && isGloved === true) {
            sprite.alive = false
            document.getElementById('status').textContent = 'You punch a sprite!'
        }
    else if(player.x < sprite.x + sprite.width
        && player.x + player.width > sprite.x
        && player.y < sprite.y + sprite.height
        && player.y + player.height > sprite.y
        && isGloved === false) {
            player.y -= 25
           // player.x -= 15
            playerHealth -= 10
            // document.getElementById('health').textContent = playerHealth
            //player.alive = false
            document.getElementById('status').textContent = 'You got punch by a sprite!'
        }
        else if (playerHealth === 0) {
            document.getElementById('status').textContent = 'you die by a sprite!'
        }
}
//+ sprite.width
const borderLeftHit = () => {
    if (sprite.x === borderLeft.x 
        && spriteDirection === 'left'){
            spriteDirection = 'right'
        }
    if (player.x === borderLeft.x) {
        player.x += 30
        document.getElementById('status').textContent = 'The world punch you for trying to abandon mug'
        playerHealth -=10
    }
}
const borderRightHit = () => {
    if (sprite.x  + sprite.width=== borderRight.x 
        && spriteDirection === 'right'){
            spriteDirection = 'left'
        }
    if (player.x + player.width === borderRight.x) {
            player.x -= 30
            document.getElementById('status').textContent = 'The world punch you for trying to abandon mug'
            playerHealth-=10
        }
}
//console.log(isGloved)