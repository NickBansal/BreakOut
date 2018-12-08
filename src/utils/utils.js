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
