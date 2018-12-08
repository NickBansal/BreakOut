import React, { Component } from 'react';
import { drawPaddle, drawBall } from './utils/utils'
import './App.css';

class App extends Component {

  state = {
    paddleWidth: 100,
    paddleHeight: 20,
    game: false,
    paddleX: (660-80)/2,
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
        width={660} 
        height={350} />
        <button onClick={this.handleClick}>START</button>
      </div>
    );
  }

  handleClick = () => {
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      const ctx = this.refs.canvas.getContext('2d');
      ctx.clearRect(0, 0, 660, 350);
      let paddleX = this.state.paddleX
      let ballX = this.state.ballX
      let ballY = this.state.ballY
      let dx = this.state.dx;
      let dy = this.state.dy;
      dx = ballX > 650 || ballX < 10 ? dx = -dx : dx
      dy = ballY > 340 || ballY < 10 ? dy = -dy : dy
      ballX += dx
      ballY += dy

      drawBall(ctx, ballX, ballY, 10)
      drawPaddle(ctx , paddleX)

      this.setState({
        ballX,
        ballY,
        dx, 
        dy
      })

    }, 5)
  }

  keyDownHandler = event => {
    let paddleX = this.state.paddleX
    if (event === 'ArrowRight' && paddleX < 660 - this.state.paddleWidth) paddleX += 60;
    if (event === 'ArrowLeft' && paddleX > 0) paddleX -= 60;
    this.setState({
      paddleX
    })
  }
}

export default App;
