//these are the dom elements that link my canvas and images to my javascript
const game = document.getElementById("canvas");
game.setAttribute("width", getComputedStyle(game)["width"]);
game.setAttribute("height", getComputedStyle(game)["height"]);
const movement = document.getElementById("movement");
const glovePic = document.getElementById("glove");
const glovePunch = document.getElementById("gloveExtend");
const mugPic = document.getElementById("mug");
const ctx = game.getContext("2d");
//these are the variables that set the values for glove status, player health and the direction of enemy objects
let isGloved = false;
let playerHealth = 100;
let spriteDirection = "left";
let drPepperDirection = "up";
let drPepper2Direction = "down";
let drPepper3Direction = "down";
let sprite2Direction = "right";
//this is the constructor that handles the properties that all game objects will have by default
class MugMen {
  constructor(x, y, color, width, height, type) {
    (this.x = x),
      (this.y = y),
      (this.color = color),
      (this.width = width),
      (this.height = height),
      (this.type = type),
      (this.alive = true),
      (this.render = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      });
  }
}
//these are the functions that spawn my glove image and punch animation into canvas
const drawGlove = () => {
  ctx.drawImage(glovePic, 735, 80);
};
const drawPunch = () => {
  ctx.drawImage(glovePunch, player.x + player.width, player.y);
};
//these are the constructed objects with all the properties defined in the constructor
let player = new MugMen(15, 15, "blue", 15, 15, "player");
let mug = new MugMen(400, 320, "brown", 30, 65, "mug");
let glove = new MugMen(735, 80, "transparent", 20, 20, "glove");
let sprite = new MugMen(100, 200, "limegreen", 30, 65, "sprite");
let sprite2 = new MugMen(740, 100, "limegreen", 30, 65, "sprite");
let drPepper = new MugMen(100, 100, "red", 30, 65, "drPepper");
let drPepper2 = new MugMen(300, 110, "red", 30, 65, "drPepper");
let drPepper3 = new MugMen(540, 50, "red", 30, 65, "drPepper");
//this function deals with setting the game loop and invokes my movement function and draws my images in the canvas
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keydown", movementHandler);
  setInterval(gameLoop, 60);
  drawGlove();
  drawMug();
});
//the gameloop function sets the render and alive status of all objects as well as resetting the render to allow for animation
const gameLoop = () => {
  ctx.clearRect(0, 0, game.width, game.height);
  movement.textContent = player.x + ", " + player.y;
  document.getElementById("health").textContent = playerHealth;
  if (player.alive) {
    player.render();
    borderHit();
    detectHit(glove);
    detectHit(mug);
  }
  if (sprite.alive) {
    sprite.render();
    spritePath();
    detectHit(sprite);
  }
  if (sprite2.alive) {
    sprite2.render();
    sprite2Path();
    detectHit(sprite2);
  }
  if (drPepper.alive) {
    drPepper.render();
    drPepperPath();
    detectHit(drPepper);
  }
  if (drPepper2.alive) {
    drPepper2.render();
    drPepper2Path();
    detectHit(drPepper2);
  }
  if (drPepper3.alive) {
    drPepper3.render();
    drPepper3Path();
    detectHit(drPepper3);
  }
  if (mug.alive) {
    mug.render();
  }
  if (glove.alive) {
    drawGlove();
    glove.render();
  }
  if (playerHealth === 0) {
    player.alive = false;
  }
};
//this function handles the movement of the player through key presses
const movementHandler = (e) => {
  if (player.alive === true) {
    switch (e.keyCode) {
      case 87:
        player.y -= 5;
        break;
      case 65:
        player.x -= 5;
        break;
      case 83:
        player.y += 5;
        break;
      case 68:
        player.x += 5;
        break;
    }
  } else {
    return false;
  }
};
//these functions handle the movement of the enemy objects
const spritePath = () => {
  if (spriteDirection === "right") {
    sprite.x += 5;
  } else if (spriteDirection === "left") {
    sprite.x -= 5;
  }
};
const sprite2Path = () => {
  if (sprite2Direction === "right") {
    sprite2.x += 10;
  } else if (sprite2Direction === "left") {
    sprite2.x -= 10;
  }
};
const drPepperPath = () => {
  if (drPepperDirection === "down") {
    drPepper.y += 5;
  } else if (drPepperDirection === "up") {
    drPepper.y -= 5;
  }
};
const drPepper2Path = () => {
  if (drPepper2Direction === "down") {
    drPepper2.y += 8;
  } else if (drPepper2Direction === "up") {
    drPepper2.y -= 8;
  }
};
const drPepper3Path = () => {
  if (drPepper3Direction === "down") {
    drPepper3.y += 10;
  } else if (drPepper3Direction === "up") {
    drPepper3.y -= 10;
  }
};
//this is the function that handles all collisions for the objects
const detectHit = (thing) => {
  if (
    player.x < thing.x + thing.width &&
    player.x + player.width > thing.x &&
    player.y < thing.y + thing.height &&
    player.y + player.height > thing.y &&
    isGloved &&
    thing.type === "sprite"
  ) {
    drawPunch();
    thing.alive = false;
    document.getElementById("status").textContent = "You punch a sprite!";
  } else if (
    player.x < thing.x + thing.width &&
    player.x + player.width > thing.x &&
    player.y < thing.y + thing.height &&
    player.y + player.height > thing.y &&
    isGloved &&
    thing.type === "drPepper"
  ) {
    drawPunch();
    thing.alive = false;
    document.getElementById("status").textContent = "You punch a dr.Pepper!";
  } else if (
    player.x < thing.x + thing.width &&
    player.x + player.width > thing.x &&
    player.y < thing.y + thing.height &&
    player.y + player.height > thing.y &&
    !isGloved &&
    thing.type === "sprite" &&
    spriteDirection === "left"
  ) {
    player.x -= 50;
    player.y -= 50;
    playerHealth -= 10;
    document.getElementById("status").textContent =
      "You got punch by a sprite!";
  } else if (
    player.x < thing.x + thing.width &&
    player.x + player.width > thing.x &&
    player.y < thing.y + thing.height &&
    player.y + player.height > thing.y &&
    !isGloved &&
    thing.type === "sprite" &&
    spriteDirection === "right"
  ) {
    player.x += 50;
    player.y -= 50;
    playerHealth -= 10;
    document.getElementById("status").textContent =
      "You got punch by a sprite!";
  } else if (
    player.x < thing.x + thing.width &&
    player.x + player.width > thing.x &&
    player.y < thing.y + thing.height &&
    player.y + player.height > thing.y &&
    !isGloved &&
    thing.type === "drPepper" &&
    drPepperDirection === "up"
  ) {
    player.x -= 50;
    player.y -= 50;
    playerHealth -= 10;
    document.getElementById("status").textContent =
      "You got punch by a dr.Pepper!";
  } else if (
    player.x < thing.x + thing.width &&
    player.x + player.width > thing.x &&
    player.y < thing.y + thing.height &&
    player.y + player.height > thing.y &&
    !isGloved &&
    thing.type === "drPepper" &&
    drPepperDirection === "down"
  ) {
    player.x -= 50;
    player.y += 50;
    playerHealth -= 10;
    document.getElementById("status").textContent =
      "You got punch by a dr.Pepper!";
  }
  if (
    player.x < glove.x + glove.width &&
    player.x + player.width > glove.x &&
    player.y < glove.y + glove.height &&
    player.y + player.height > glove.y
  ) {
    glove.alive = false;
    document.getElementById("status").textContent = "You have a glove!";
    isGloved = true;
  }
  if (
    player.x < mug.x + mug.width &&
    player.x + player.width > mug.x &&
    player.y < mug.y + mug.height &&
    player.y + player.height > mug.y
  ) {
    mug.alive = false;
    document.getElementById("status").textContent = "You save a mug!";
  }
  if (playerHealth === 0) {
    player.alive = false;
    document.getElementById("status").textContent = "You die by a soda punch";
  }
};
//this is the function that handles all collisions with the borders from enemies or player
const borderHit = () => {
  if (player.x <= 0) {
    player.x += 5;
    document.getElementById("status").textContent =
    "The world punch you for trying to abandon mug";
  }
  if (player.x + player.width >= 800) {
    player.x -= 5;
    document.getElementById("status").textContent =
    "The world punch you for trying to abandon mug";
  }
  if (player.y <= 0) {
    player.y += 5;
    document.getElementById("status").textContent =
    "The world punch you for trying to abandon mug";
  }
  if (player.y + player.height >= 395) {
    player.y -= 5;
    document.getElementById("status").textContent =
    "The world punch you for trying to abandon mug";
  }
  //these conditionals handle the directional changes of the enemies when they collide with the borders
  if (sprite.x + sprite.width >= 800 && spriteDirection === "right") {
    spriteDirection = "left";
  }
  if (drPepper.y <= 0 && drPepperDirection === "up") {
    drPepperDirection = "down";
  }
  if (drPepper.y + drPepper.height >= 400 && drPepperDirection === "down") {
    drPepperDirection = "up";
  }
  if (sprite.x <= 0 && spriteDirection === "left") {
    spriteDirection = "right";
  }
  if (sprite2.x <= 0 && sprite2Direction === "left") {
    sprite2Direction = "right";
  }
  if (sprite2.x + sprite2.width >= 800 && sprite2Direction === "right") {
    sprite2Direction = "left";
  }
  if (drPepper2.y <= 0 && drPepper2Direction === "up") {
    drPepper2Direction = "down";
  }
  if (drPepper2.y + drPepper2.height >= 400 && drPepper2Direction === "down") {
    drPepper2Direction = "up";
  }
  if (drPepper3.y <= 0 && drPepper3Direction === "up") {
    drPepper3Direction = "down";
  }
  if (drPepper3.y + drPepper3.height >= 400 && drPepper3Direction === "down") {
    drPepper3Direction = "up";
  }
};
