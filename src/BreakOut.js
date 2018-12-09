import React, { Component } from 'react';
import { drawPaddle, drawBall, drawBricks, collisionDetection } from './utils/utils'
import './App.css';

class App extends Component {

  state = {
    paddleWidth: 100,
    paddleHeight: 20,
    game: true,
    gameOver: false,
    paddleX: (660-80)/2,
    ballX: (660-80)/2,
    ballY: 330, 
    bricks: [],
    dx: -2, 
    dy: -2
  }

  render() {
    const { gameOver, game } = this.state
    const style = gameOver ? { filter: 'grayscale(100%) opacity(0.2)', transition: '1s' } : null
    return (
      <div className="App">
        <h1 style={style}>Breakout</h1>
        <canvas 
        style={style}
        tabIndex='0'
        onKeyDown={(e) => this.keyDownHandler(e.key)}
        ref="canvas" 
        width={660} 
        height={350} />
        <button style={style} onClick={this.handleClick}>START</button>
        {!game && gameOver && 
          <div id="ResetModal">
            <h1>Game Over</h1>
            <h2>Final Score: Score</h2>
            <button onClick={this.handleClick}>RESET</button>
          </div>
        }
      </div>
    );
  }

  handleClick = () => {
    clearInterval(this.interval)
    if (this.state.game) {
      this.interval = setInterval(() => {
        
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, 660, 350);
        
        let paddleX = this.state.paddleX
        let ballX = this.state.ballX
        let ballY = this.state.ballY
        let dx = this.state.dx;
        let dy = this.state.dy;
        let gameOver = this.state.gameOver
        let game = this.state.game
        
        dx = ballX > 650 || ballX < 10 ? dx = -dx : dx
        
        dy = ballY < 10 || 
        (ballY > 320 && (ballX > paddleX && ballX < paddleX + 100)) ||
        collisionDetection(this.state.bricks, ballX, ballY) ? dy = -dy : dy
        
        gameOver = ballY > 350 ? true : false
        game = ballY > 350 ? false : true

        ballX += dx
        ballY += dy

        drawBall(ctx, ballX, ballY, 10)
        drawPaddle(ctx , paddleX)
        drawBricks(ctx, this.state.bricks)
        
        this.setState({
          ballX,
          ballY,
          dx, 
          dy,
          gameOver,
          game
        })
      }, 5)
    } else {
      this.setState({
        game: true,
        gameOver: false,
        paddleX: (660-80)/2,
        ballX: (660-80)/2,
        ballY: 330, 
        dx: -2, 
        dy: -2
      })
    }
  }

  keyDownHandler = event => {
    let paddleX = this.state.paddleX
    if (event === 'ArrowRight' && paddleX < 660 - this.state.paddleWidth) paddleX += 60;
    if (event === 'ArrowLeft' && paddleX > 0) paddleX -= 60;
    this.setState({
      paddleX
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.gameOver !== this.state.gameOver && this.state.gameOver) {
      this.setState({
        game: false
      })
    }
  }
}

export default App;
