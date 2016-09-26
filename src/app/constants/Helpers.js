function getArray(x, y, func) {
  return [...Array(y)].map(() => [...Array(x)].map(() => func()));
}

function getOffset(playerX, playerY, mapWidth, mapHeight, viewWidth, viewHeight) {
  const x = 0;
  let y = 0;
  if (playerY < Math.floor(viewHeight / 2)) {
    y = 0;
  } else if (playerY >= Math.floor(viewHeight / 2) && playerY < mapHeight - Math.floor(viewHeight / 2)) {
    y = -(viewHeight - playerY);
  } else {
    y = -(mapHeight - Math.floor(viewHeight / 2));
  }
  console.log(playerX, playerY, mapWidth, mapHeight, viewWidth, viewHeight);
  console.log(x, y);
  return {x, y};
}
