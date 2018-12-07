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

  
  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, 200, 200);
    this.drawPaddle(ctx)
  }
  
  handleClick = () => {
    this.setState({
      game: true
    })
  }

}

export default App;
