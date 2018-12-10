import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Breakout</h1>
        <canvas
          ref="canvas"
          width={650}
          height={450} />
      </div>
    );
  }
  update() {
    const Width = 650,
      Height = 450,
      ctx = this.refs.canvas.getContext('2d'),
      brickWidth = (Width / 10) - 2.25,
      colors = ["#18582b", "#0c905d", "#00c78e", "#33dbff", "#3375ff", "#5733ff"];

    let ball = {
      x: (Width / 2) - 3,
      y: (Height / 2) - 3,
      radius: 6,
      speedX: 0,
      speedY: 6
    }
    let paddle1 = {
      w: 100,
      h: 10,
      x: Width / 2 - (100 / 2),// 100 is paddle.w
      y: Height - 10,
      speed: 6
    },
      bricks = [],
      ballOn = false,

      // color,
      gameOver = 0; // 1 you lost - 2 you win

    function KeyListener() {
      this.pressedKeys = [];
      this.keydown = function (e) { this.pressedKeys[e.keyCode] = true };
      this.keyup = function (e) { this.pressedKeys[e.keyCode] = false };
      document.addEventListener("keydown", this.keydown.bind(this));
      document.addEventListener("keyup", this.keyup.bind(this));
    }
    KeyListener.prototype.isPressed = function (key) {
      return this.pressedKeys[key] ? true : false;
    };
    KeyListener.prototype.addKeyPressListener =
      function (keyCode, callback) {
        document.addEventListener("keypress", function (e) {
          if (e.keyCode === keyCode)
            callback(e);
        });
      };
    var keys = new KeyListener();


    // create array 60 bricks
    function createBricks() {
      let brickX = 2, brickY = 10, j = 0;
      for (var i = 0; i < 60; i++) {
        let brick = {
          x: brickX,
          y: brickY,
          w: brickWidth,
          h: 10,
          color: colors[j]
        }
        bricks.push(brick);
        brickX += brickWidth + 2;
        if (brickX + brickWidth + 2 > Width) {
          brickY += 12;
          brickX = 2;
          j++;
        }
      }
    }
    createBricks();

    // check collision !!ball must be first!!
    function checkCollision(obj1, obj2) {
      if (obj1 !== ball) {
        if (obj1.y >= obj2.y &&
          obj1.y <= obj2.y + obj2.h &&
          obj1.x >= obj2.x &&
          obj1.x <= obj2.x + obj2.w) {
          return true
        }
      } else {
        if (obj1.y + obj1.radius >= obj2.y &&
          obj1.y - obj1.radius <= obj2.y + obj2.h &&
          obj1.x - obj1.radius >= obj2.x &&
          obj1.x + obj1.radius <= obj2.x + obj2.w) {
          return true
        }
      }
    }

    // if ball touch brick destroy
    function destroyBrick() {
      for (var i = 0; i < bricks.length; i++) {
        if (checkCollision(ball, bricks[i])) {
          ball.speedY = -ball.speedY;
          bricks.splice(i, 1);
        }
      }
    }

    // reset everything for a new gme
    function newGame() {
      bricks = [];
      createBricks();
      ball.x = (Width / 2) - 3;
      ball.y = (Height / 2) - 3;
      ball.speedX = 0;
      ballOn = false;
      ball = {
        x: (Width / 2) - 3,
        y: (Height / 2) - 3,
        radius: 6,
        speedX: 0,
        speedY: 6
      };
      paddle1 = {
        w: 100,
        h: 10,
        x: Width / 2 - (100 / 2),// 100 is paddle.w
        y: Height - 10,
        speed: 6
      };
    }

    function draw() {
      ctx.clearRect(0, 0, Width, Height)
      ctx.fillStyle = "lightcoral";
      ctx.fillRect(0, 0, Width, Height);
      // paddle
      ctx.fillStyle = "#fff";
      ctx.fillRect(paddle1.x, paddle1.y, paddle1.w, paddle1.h);

      if (ballOn === false) {
        ctx.font = "14px Raleway";
        ctx.textAlign = "center";
        ctx.fillText("Press spacebar to start a new game.", Width / 2, (Height / 2) - 25);
        ctx.font = "14px Raleway";
        ctx.fillText("Move with arrow keys or A & D.", Width / 2, (Height / 2) + 25);
        if (gameOver === 1) {
          ctx.font = "52px Raleway";
          ctx.fillText("YOU LOST!", Width / 2, (Height / 2) - 90);
          ctx.font = "36px Raleway";
          ctx.fillText("Keep trying!", Width / 2, (Height / 2) - 50);
        } else if (gameOver === 2) {
          ctx.font = "52px Raleway";
          ctx.fillText("YOU WON!", Width / 2, (Height / 2) - 90);
          ctx.font = "36px Raleway";
          ctx.fillText("Congratulations!", Width / 2, (Height / 2) - 50);
        }
      }
      // ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();
      //bricks
      for (var i = 0; i < bricks.length; i++) {
        ctx.fillStyle = bricks[i].color;
        ctx.fillRect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h);
      }
    }

    function move() {
      // paddle movement
      if (keys.isPressed(37) &&
        paddle1.x > 0) { // LEFT
        paddle1.x -= paddle1.speed;
      } else if (keys.isPressed(39) &&
        (paddle1.x + paddle1.w) < Width) { // RIGHT
        paddle1.x += paddle1.speed;
      }
      // start ball on space key
      if (keys.isPressed(32) && ballOn === false) {
        ballOn = true;
        gameOver = 0;
      }
      // ball movement
      if (ballOn === true) {
        ball.x += ball.speedX;
        ball.y += ball.speedY;
        // check ball hit ceiling
        if (ball.y <= 0) {
          ball.speedY = -ball.speedY;
        }
        // check ball hit paddle and angle
        if (ball.y + ball.radius >= paddle1.y &&
          ball.x - ball.radius >= paddle1.x &&
          ball.x + ball.radius <= paddle1.x + paddle1.w) {
          ball.speedY = -ball.speedY;
          let deltaX = ball.x - (paddle1.x + paddle1.w / 2)
          ball.speedX = deltaX * 0.15;
        }
        // check ball hit wall left-right
        if (ball.x >= Width || ball.x <= 0) {
          ball.speedX = -ball.speedX;
        }
        // check if lost
        if (ball.y > Height) {
          gameOver = 1;
          newGame();
        }
        destroyBrick();
        // check if win
        if (bricks.length < 1) {
          gameOver = 2;
          newGame();
        }
      }
    }

    function loop() {
      move();
      draw();
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  componentDidMount() {
    this.update();
  }
}

export default App;
