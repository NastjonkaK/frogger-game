// Enemies our player must avoid
const gameField = {
    min = 0,
    max = 450,
    width = 500,
    cellWidth = 100,
    cellHeight = 80
};

const enemyStartPosition = {
    enemyStartX = -100,
    enemyFirstStartY = 50,
    enemyMaxSpeed = 6,
    enemyMinSpeed = 1
};

const playerStartPosition = {
    playerStartX = 200,
    playerStartY = 350,
};

const Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = enemyStartX;
    this.speed = Math.floor(Math.random() * (enemyMaxSpeed - enemyMinSpeed) + enemyMinSpeed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > gameField.width) {
        this.x = enemyStartX;
    }
};

Enemy.prototype.collision = function() {
    allEnemies.forEach(function(enemy) {
        if ( Math.round(enemy.x / gameField.cellWidth) === Math.round(player.x / gameField.cellWidth) && 
             Math.round(enemy.y / gameField.cellHeight) === Math.round(player.y / gameField.cellHeight) ) {
                player.restart();
        }
    });
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = playerStartX;
    this.y = playerStartY;
};

Player.prototype.update = function(dt) {
    if (this.x <= gameField.min) {
        return;
    } else if (this.x >= gameField.width) {
        return;
    } else if (this.y >= gameField.max) {
        return;
    } else if (this.y <= gameField.min) {
        return;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        this.x -= cellWidth;
    } else if (key == 'right') {
        this.x += cellWidth;
    } else if (key == 'up') {
        this.y -= cellHeight;
    } else if (key == 'down') {
        this.y += cellHeight;
    };
};

Player.prototype.restart = function() {
    this.x = playerStartX;
    this.y = playerStartY;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player();


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
