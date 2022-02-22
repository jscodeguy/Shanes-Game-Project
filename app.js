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
let player = new MugMen(10, 10, 'blue', 16, 16)
let mug = new MugMen(600, 300, 'brown', 32, 64)
let glove = new MugMen(50, 50, 'transparent', 20,20 )
let sprite = new MugMen(200, 200, 'limegreen', 32, 64)
let borderLeft = new MugMen(4, 0, 'red', 4, 900)
let borderRight = new MugMen(792, 0, 'red', 4, 900)
document.addEventListener('DOMContentLoaded', function () {
    
    document.addEventListener('keydown', movementHandler)
    setInterval(gameLoop, 60)
    drawGlove()
})

const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height)
    movement.textContent = player.x + ', ' + player.y
    // player.render()
    if (player.alive) {
        player.render()
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
        document.getElementById('status').textContent = 'you die by a sprite!'
    }
    if (borderLeft.alive){
        borderLeft.render()
    }
    if (borderRight.alive){
        borderRight.render()
    }
}
const movementHandler = (e) => {
    switch (e.keyCode) {
        case (87):
            player.y -= 15
            break
        case (65):
            player.x -= 15
            //sprite.x -= 10
            break
        case (83):
            player.y += 15
            break
        case (68):
            player.x += 15
            //sprite.x += 10
            break
    }
}
const spritePath = () => {
    if (spriteDirection === 'right'){
        sprite.x += 4
    }
    else if (spriteDirection === 'left') {
        sprite.x -= 4
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
            document.getElementById('health').textContent = playerHealth
            //player.alive = false
            document.getElementById('status').textContent = 'You got punch by a sprite!'
        }
}
const borderLeftHit = () => {
    if (sprite.x === borderLeft.x 
        && spriteDirection === 'left'){
            spriteDirection = 'right'
        }
}
const borderRightHit = () => {
    if (sprite.x + sprite.width === borderRight.x 
        && spriteDirection === 'right'){
            spriteDirection = 'left'
        }
}
//console.log(isGloved)