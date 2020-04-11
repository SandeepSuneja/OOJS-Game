// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.random()*300;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x <= 550){
      this.x += this.speed*dt;
    }else{
      this.x = -2;
    }

    if(player.x >= this.x-30 && player.x <= this.x+30 && player.y >= this.y-30 && player.y <= this.y+30){
      player.x = 200;
      player.y = 400;
      var div = document.createElement('div');
      div.id = 'lose';
      div.innerHTML = '<h1>LOSE</h1>';
      document.body.appendChild(div);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(){
  this.x = 200;
  this.y = 400;
  this.sprite = 'images/char-boy.png';
  this.win = 0;
}
Player.prototype.update = function(){
  if(this.y <= -10 && this.win == 0){
    var div = document.createElement('div');
    div.id = 'win';
    div.innerHTML = '<h1>WIN</h1>';
    document.body.appendChild(div);
    this.win = 1;
  }
};
Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(keycode){
  if(keycode === 'left'){
    this.x -=30;
    if(this.x <= -20){
      this.x = 450;
    }
  }else if(keycode === 'right'){
    this.x += 30;
    if(this.x >= 470){
      this.x = -18;
    }
  }else if(keycode === 'up'){
    if(this.y > -10){
      this.y -= 30;
    }
  }else if(keycode === 'down'){
    if(this.y <= 400){
      this.y += 30;
    }
  }
}
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
var enemy1 = new Enemy(0,70);
var enemy2 = new Enemy(0,140);
var enemy3 = new Enemy(0,210);
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player
var player = new Player(200, 400);


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
