import React, { Component } from 'react';
import { drawPaddle, drawBall } from './utils/utils'
import './App.css';

class App extends Component {

  state = {
    paddleWidth: 100,
    paddleHeight: 20,
    game: false,
    paddleX: (650-80)/2,
    ballX: 240,
    ballY: 160, 
    dx: 2, 
    dy: 2
  }

  render() {

    return (
      <div className="App">
        <h1>Breakout</h1>
        <canvas 
        tabIndex='0'
        onKeyDown={(e) => this.keyDownHandler(e.key)}
        ref="canvas" 
        width={650} 
        height={350} />
        <button onClick={this.handleClick}>START</button>
      </div>
    );
  }
  
  updateCanvas(paddleX) {
    const ctx = this.refs.canvas.getContext('2d');
    drawPaddle(ctx , paddleX)
  }
  
  handleClick = () => {
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      const ctx = this.refs.canvas.getContext('2d');

      let ballX = this.state.ballX
      let ballY = this.state.ballY
      let dx = this.state.dx;
      let dy = this.state.dy;

      dx = ballX > 640 || ballX < 10 ? dx = -dx : dx
      dy = ballY > 340 || ballY < 10 ? dy = -dy : dy
      ballX += dx
      ballY += dy

      drawBall(ctx, ballX, ballY, 10)
      
      this.setState({
        ballX,
        ballY,
        dx, 
        dy
      })

    }, 10)
  }

  keyDownHandler = event => {
    let paddleX = this.state.paddleX
    if (event === 'ArrowRight' && paddleX < 650 - this.state.paddleWidth) paddleX += 30;
    if (event === 'ArrowLeft' && paddleX > 0) paddleX -= 30;
    this.updateCanvas(paddleX)
    this.setState({
      paddleX
    })
  }
}

export default App;
