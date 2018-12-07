import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    rightPressed: true, 
    leftPressed: false,
    game: false,
    paddleX: (650-80)/2
  }

  render() {

    return (
      <div className="App">
        <h1>Breakout</h1>
        <canvas 
        tabIndex='0'
        onKeyDown={(e) => this.keyDownHandler(e.key)}
        onKeyUp={(e) => this.keyUpHandler(e.key)}
        ref="canvas" 
        width={650} 
        height={350} />
        {!this.state.game && <button onClick={this.handleClick}>START</button>}
      </div>
    );
  }

  drawPaddle = (ctx, paddleX) => {
    ctx.clearRect(0, 0, 350, 650);
    ctx.beginPath();
    ctx.rect(this.state.paddleX, 330, 100, 20)
    ctx.fillStyle = "#FFEECC";
    ctx.fill();
    ctx.closePath();
  }
  
  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    this.drawPaddle(ctx, this.state.paddleX)
  }
  
  handleClick = () => {
    this.setState({
      game: true
    })
    this.updateCanvas()
  }
}

export default App;
