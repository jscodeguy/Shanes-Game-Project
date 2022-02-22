// here, we're saving the canvas and the positioning message
// so we can refer to them later
const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const glovePic = document.getElementById('glove')
let isGloved = false
const ctx = game.getContext('2d')
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
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
}
const movementHandler = (e) => {
    switch (e.keyCode) {
        case (87):
            player.y -= 8
            break
        case (65):
            player.x -= 8
            break
        case (83):
            player.y += 8
            break
        case (68):
            player.x += 8
            break
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
            player.alive = false
            document.getElementById('status').textContent = 'You got punch by a sprite!'
        }
}
//console.log(isGloved)