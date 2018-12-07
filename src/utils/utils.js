  //   ctx.beginPath();
  //   ctx.arc(240, 160, 10, 0, Math.PI*2, false);
  //   ctx.fillStyle = "red";
  //   ctx.fill();
  //   ctx.closePath();
  // }
export const drawPaddle = (ctx, paddleX) => {
    ctx.clearRect(0, 0, 650, 350);
    ctx.beginPath();
    ctx.rect(paddleX, 330, 100, 20)
    ctx.fillStyle = "#FFEECC";
    ctx.fill();
    ctx.closePath();
  }