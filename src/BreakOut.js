import React, { Component } from 'react';
import { drawPaddle } from './utils/utils'
import './App.css';

class App extends Component {

  state = {
    paddleWidth: 100,
    paddleHeight: 20,
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
        ref="canvas" 
        width={650} 
        height={350} />
        {!this.state.game && <button onClick={this.handleClick}>START</button>}
      </div>
    );
  }
  
  updateCanvas(paddleX) {
    const ctx = this.refs.canvas.getContext('2d');
    drawPaddle(ctx , paddleX)
  }
  
  handleClick = () => {
    this.setState({
      game: true
    })
    this.updateCanvas(this.state.paddleX)
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
