
  'use strict';

  var Bird = require('../prefabs/bird');
  var Ground = require('../prefabs/ground');
  var PipeGroup = require('../prefabs/pipeGroup');

  function Play(){}
  Play.prototype = {
    create: function(){
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = 1000;

      this.background = this.game.add.sprite(0, 0, 'background');

      this.bird = new Bird(this.game, 100, this.game.height/2);
      this.game.add.existing(this.bird);

      this.pipes = this.game.add.group();

      this.ground = new Ground(this.game, 0, 400, 335, 112);
      this.game.add.existing(this.ground);



      // add keyboard controls
      var flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      flapKey.onDown.add(this.bird.flap, this.bird);

      // add mouse/touch controls
      this.input.onDown.add(this.bird.flap, this.bird);

      this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

      // add a timer
      this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.5, this.generatePipes, this);
      this.pipeGenerator.timer.start();
    },
    update: function(){
      this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);

      this.pipes.forEach(function(pipeGroup){
        this.game.physics.arcade.collide(this.bird, pipeGroup, this.deathHandler, null, this);
      }, this);
    },
    generatePipes: function(){
      var pipeY = this.game.rnd.integerInRange(-100, 100);
      var pipeGroup = this.pipes.getFirstExists(false);
//      pipeGroup.x = this.game.width;
//      pipeGroup.y = pipeY;
      if(!pipeGroup){
        pipeGroup = new PipeGroup(this.game, this.pipes);
      }
      pipeGroup.reset(this.game.width + pipeGroup.width/2, pipeY);
    },

    generateBird: function(){
      var bird = this.birdGroup.getFirstExists(false);
      if(!bird){
        bird = new Bird(this.game, x, y);
        this.birdGroup.add(bird);
      }
      bird.reset(x,y);
    },
    deathHandler: function(){
      this.game.state.start('gameover');
    },
    shutdown: function(){
      this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
      this.bird.destroy();
      this.pipes.destroy();
    }
  };

  module.exports = Play;
