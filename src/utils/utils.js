export const drawBall = (ctx, x, y, r) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, false);
  ctx.fillStyle = "lightgrey";
  ctx.fill();
  ctx.closePath();
}

export const drawPaddle = (ctx, paddleX) => {
  ctx.beginPath();
  ctx.rect(paddleX, 330, 100, 20)
  ctx.fillStyle = "#FFEECC";
  ctx.fill();
  ctx.closePath();
}

export const drawBricks = ctx => {
  const bricks = [];
  for(let i=0; i<7; i++) {
    bricks[i] = [];
    for(let j=0; j<3; j++) {
        bricks[i][j] = { x: 0, y: 0 };
    }
  }
  for(let c=0; c<7; c++) {
    for(let r=0; r<3; r++) {
      let brickX = (c*(80+10))+20;
      let brickY = (r*(20+10))+20;
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      ctx.beginPath();
      ctx.rect(brickX, brickY, 80, 20);
      ctx.fillStyle = "#D1FAFF";
      ctx.fill();
      ctx.closePath();
    }
  }
}