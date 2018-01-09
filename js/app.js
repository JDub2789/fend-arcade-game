// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  (this.x += this.speed) * dt;
  // Collision logic
  if ((Math.abs(player.x - this.x) <= 30) && (Math.abs(player.y - this.y) <= 25)) {
  // if (this.x === player.x && this.y === player.y) {
    player.x = 200;
    player.y = 400;
    return;
  }
  // Resets enemies when they reach edge of screen
  if (this.x >= 500) {
    this.x = -125;
  }
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 400;
};

let winCounter = 0;
let winSpan = document.getElementById('winCounter');
winSpan.textContent = winCounter;
Player.prototype.update = function(dt) {
  this.speed *= dt;
  if (this.y === -25) {
    this.x = 200;
    this.y = 400;
    winCounter++;
    winSpan.textContent = winCounter;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  if (key === 'up' && this.y >= -25 && this.y <= 500) {
    this.y -= 25;
  } else if (key === 'down' && this.y >= -25 && this.y <= 400) {
    this.y += 25;
  } else if (key === 'right' && this.x < 425 && this.x >= 0) {
    this.x += 25;
  } else if (key === 'left' && this.x <= 425 && this.x > 0) {
    this.x -= 25;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(0, 225, 4);
const enemy2 = new Enemy(0, 150, 5);
const enemy3 = new Enemy(0, 50, 3);
const enemy4 = new Enemy(0, 100, 3.5);

const allEnemies = [enemy1, enemy2, enemy3, enemy4];
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
