function getArray(x, y, func) {
  return [...Array(y)].map(() => [...Array(x)].map(() => func()));
}

function getOffset(playerX, playerY, mapWidth, mapHeight, viewWidth, viewHeight) {
  const left = 0;
  let top = 0;
  if (playerY < Math.floor(viewHeight / 2)) {
    top = 0;
  } else if (playerY >= Math.floor(viewHeight / 2) && playerY < mapHeight - Math.floor(viewHeight / 2)) {
    top = Math.floor(viewHeight / 2) - playerY;
  } else {
    top = Math.floor(viewHeight / 2) - mapHeight;
  }
  return {left, top};
}
