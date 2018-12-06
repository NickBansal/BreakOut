import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {}

  render() {
    return (
      <div className="App">
        <h1>Breakout</h1>
      <canvas ref="canvas" width={550} height={350}/>
      </div>
    );
  }


  componentWillMount() {
    this.setState({
      canvasSize: {
        canvasHeight: 350,
        canvasWidth: 550
      }
    })
  }
}

export default App;
