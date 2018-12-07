import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    paddleHeight: 20,
    paddleWidth: 80,
    rightPressed: true, 
    leftPressed: false,
    game: true,
    paddleX: (650-80)/2
  }

  render() {
    // this.updateCanvas()
    return (
      <div className="App">
        <h1>Breakout</h1>
        <canvas 
        tabIndex='0'
        onKeyDown={(e) => this.keyDownHandler(e.key)}
        onKeyUp={(e) => this.keyUpHandler(e.key)}
        ref="canvas" 
        width={650} 
        height={350}/>
        <button>Start Game</button>
      </div>
    );
  }

  drawPaddle = ctx => {
    ctx.clearRect(0, 0, 200, 200);
    const { rightPressed, leftPressed, paddleWidth, paddleHeight } = this.state
    let paddleX = this.state.paddleX
    let newPaddle
    ctx.beginPath();
    ctx.rect(paddleX, this.refs.canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle =  "#FFEECC";
    ctx.fill();
    ctx.closePath();

    if (rightPressed && paddleX < this.refs.canvas.width - paddleWidth) newPaddle = paddleX += 7;
    if (leftPressed && paddleX > 0) newPaddle = paddleX -= 7;
    this.setState({
      paddleX: newPaddle
    })
  }

  drawBall = ctx => {
    ctx.beginPath();
    ctx.arc(240, 160, 10, 0, Math.PI*2, false);
    ctx.fillStyle = "#CCCCCC";
    ctx.fill();
    ctx.closePath();
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, 200, 200);
    this.drawPaddle(ctx)
    this.drawBall(ctx)
  }

  keyDownHandler = (e) => {
    let rightPressed, leftPressed
    if (e === 'ArrowRight') rightPressed = true
    else if (e === 'ArrowLeft') leftPressed = true;
    this.setState({
      rightPressed, 
      leftPressed
    })
    this.updateCanvas()
  }

  keyUpHandler = (e) => {
    let rightPressed, leftPressed
    if (e === 'ArrowRight') rightPressed = false
    else if (e === 'ArrowLeft') leftPressed = false;
    this.setState({
      rightPressed, 
      leftPressed
    })
    this.interval = setInterval(() => {
      this.updateCanvas()
    })
  }

  componentDidMount () {
    this.updateCanvas()
  }

}

export default App;
