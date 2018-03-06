// **** Enemy Class ****
var Enemy = function(x,y) {
   
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //x and y coordinates:
     this.x = x;
     this.y = y;

    //speed of the bugs - Math.random()
    this.speed = Math.floor((Math.random()*150)+100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
   
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    if(this.x <= 505) {  //width = 505
        this.x = this.x + this.speed * dt;
    } else {
        this.x = -1;
    }

};

// Draw the enemy on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 150;
    this.y = 300;
    

}

Player.prototype.update = function(dt) {
    

    var uplayer = this;
    //if left key is pressed:
    if(this.pressedKey === 'left' && this.x > 0) { 
        this.x = this.x - 100;
    }

    //if right key is pressed:
    if(this.pressedKey === 'right' && this.x < 400) { 
        this.x = this.x + 100;
    }

    //if up key is pressed:
    if(this.pressedKey === 'up' && this.y > 0) {
        this.y = this.y - 90;
    }

    //if down key is pressed:
    if(this.pressedKey === 'down' && this.y < 400) {
        this.y = this.y + 90;
    }

    // make player jump only once when key is pressed:
    this.pressedKey = null;

    //if player reaches water, reset:
    if(this.y < 0) {
        this.reset();
    }

    allEnemies.forEach(function(enemy) {
    if(uplayer.x >= enemy.x - 25 && uplayer.x <= enemy.x + 25) {
        if(uplayer.y >= enemy.y - 25 && uplayer.y <= enemy.y + 25) {
            uplayer.reset();
            }
        }
    });
};

Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handleInput() method for player:
Player.prototype.handleInput = function(e) {
 
    this.pressedKey = e;
};

//Reset player to beginning position
Player.prototype.reset = function() {
    
   this.x = 200;
   this.y = 400;
};


// Instantiation of enemies and player objects:
var allEnemies = []; //creates an array of Enemies

//this function will DISPLAY Enemies:
(function displayEnemies() {
  
    allEnemies.push(new Enemy(0, 50));
    allEnemies.push(new Enemy(0, 100));
    allEnemies.push(new Enemy(0, 150));
}());


var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});