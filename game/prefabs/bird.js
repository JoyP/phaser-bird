'use strict';

var Bird = function(game, x, y, frame){
  Phaser.Sprite.call(this, game, x, y, 'bird', frame);

  this.anchor.setTo(-0.2, 0.5);
  this.animations.add('flap');
  this.animations.play('flap', 12, true);
  this.name = 'bird';

  this.game.physics.arcade.enableBody(this);

  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;

};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function(){
  // rotate bird towards the ground if angle is less than 25
  if(this.angle < 25){
    this.angle += 2;
  }

};

Bird.prototype.flap = function(){
  this.body.velocity.y = -400;

  // rotate the bird to -40 degrees
  this.game.add.tween(this).to({angle: -25}, 100).start();
};

module.exports = Bird;
