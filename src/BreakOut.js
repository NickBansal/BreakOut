import React, { Component } from 'react';
import { 
  drawPaddle, 
  drawBall, 
  bricksArray,
  drawBricks,
  // collisionDetection
} from './utils/utils'
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
    dx: -2, 
    dy: -2,
    score: 0
  }

  render() {
    const { gameOver, game, score } = this.state
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
            <h2>Final Score: { score }</h2>
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
        let bricks = this.state.bricks
 
        dx = ballX > 650 || ballX < 10 ? dx = -dx : dx
        
        dy = ballY < 10 || 
        (ballY > 320 && (ballX > paddleX && ballX < paddleX + 100)) ? dy = -dy : dy

        const newBricks = bricks.map(brickCol => {
          return brickCol.map(brick => {
            if ((ballX >= brick.x && ballX < brick.x + 80) 
            && (ballY >= brick.y && ballY < brick.y + 20)) {
              brick.status = 0
            }
            return brick
          })
        })
  
        gameOver = ballY > 350 ? true : false
        game = ballY > 350 ? false : true

        ballX += dx
        ballY += dy
 
        
        drawBall(ctx, ballX, ballY, 10)
        drawPaddle(ctx , paddleX)
        drawBricks(ctx, newBricks)

        this.setState({
          ballX,
          ballY,
          dx, 
          dy,
          gameOver,
          game,
          bricks: newBricks
        })
      }, 15)
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

  componentDidMount() {
    const bricks = bricksArray()
    this.setState({
      bricks
    })
  }

}

export default App;
