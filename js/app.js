"use strict";
// Enemies our player must avoid
var Enemy = function(image, x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = image;
  this.x = x;
  this.y = y;
  this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
  this.checkCollisions();
  // Resets enemies when they reach edge of screen
  if (this.x >= 500) {
    this.x = -125;
  }
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Collision logic
Enemy.prototype.checkCollisions = function() {
  if ((Math.abs(player.x - this.x) <= 30) && (Math.abs(player.y - this.y) <= 50)) {
    player.reset();
  }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/sugar-smasher.png';
  this.reset();
};

let winCounter = 0;

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};
const winSpan = document.getElementById('winCounter');
Player.prototype.handleInput = function(key) {
  if (key === 'up' && this.y >= -25 && this.y <= 500) {
    this.y -= 25;
    if (this.y === -25) {
      player.reset();
      winCounter++;
      if (winCounter === 1) {
        winSpan.textContent = `${winCounter} time!`;
      } else if (winCounter === 0 || winCounter > 1) {
        winSpan.textContent = `${winCounter} times!`;
      }
    }
  } else if (key === 'down' && this.y >= -25 && this.y <= 400) {
    this.y += 25;
  } else if (key === 'right' && this.x < 400 && this.x >= 0) {
    this.x += 25;
  } else if (key === 'left' && this.x <= 425 && this.x > 0) {
    this.x -= 25;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy('images/bug-1.png', 0, 225, 250);
const enemy2 = new Enemy('images/bug-2.png', 0, 150, 125);
const enemy3 = new Enemy('images/bug-3.png', 0, 50, 175);
// const enemy4 = new Enemy(0, 100, 225);
// const enemy5 = new Enemy(-250, 75, 100);
// const enemy6 = new Enemy(-250, 250, 50);

const allEnemies = [enemy1, enemy2, enemy3];
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
