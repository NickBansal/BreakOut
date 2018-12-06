import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div onClick={() => this.handlePress()} className="App">
        <h1>Breakout</h1>
      <canvas ref="canvas" width={700} height={550}/>
      </div>
    );
  }

  handlePress = event => {
    console.log('event')
  }

  rect (props) {
    const {ctx, x, y, width, height} = props;
    ctx.fillRect(x, y, width, height);
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0,0, 200, 200);
    this.rect({ctx, x: 10, y: 10, width: 700, height: 550});
    ctx.beginPath();
    ctx.rect(30, 500, 80, 20);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(240, 160, 10, 0, Math.PI*2, false);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
  }


  componentDidMount() {
    this.updateCanvas();
  }

}

export default App;
