// Return a random integer between min (included) and max (excluded)
function _getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function _getArray(x, y, func) {
  return [...Array(y)].map(() => [...Array(x)].map(() => func()));
}

function _getWall(map, mapWidth, mapHeight) {
  let found = false;
  let x;
  let y;
  while (!found) {
    x = _getRandomInt(1, mapWidth - 1);
    y = _getRandomInt(1, mapHeight - 1);
    if (map[y][x] === SOIL &&
      map[y - 1][x] === SPACE ||
      map[y + 1][x] === SPACE ||
      map[y][x - 1] === SPACE ||
      map[y][x + 1] === SPACE) {
      found = true;
    }
  }
  return {x, y};
}

function _checkFit(map, mapWidth, mapHeight, x1, y1, x2, y2) {
  if (x1 < 0 || x2 > mapWidth - 1 || y1 < 0 || y2 > mapHeight - 1) {
    return false;
  }
  for (let i = x1; i <= x2; i++) {
    for (let j = y1; j <= y2; j++) {
      if (map[j][i] !== SOIL) {
        return false;
      }
    }
  }
  return true;
}

function _fillRect(map, x, y, w, h) {
  for (let i = x; i < x + w; i++) {
    for (let j = y; j < y + h; j++) {
      map[j][i] = SPACE;
    }
  }
}

function _getCurrentMapSize(map, mapWidth, mapHeight) {
  let minX = mapWidth - 1;
  let minY = mapHeight - 1;
  let maxX = 0;
  let maxY = 0;

  for (let i = 0; i < mapWidth; i++) {
    for (let j = 0; j < mapHeight; j++) {
      if (map[j][i] !== SOIL) {
        minX = i;
        break;
      }
    }
    if (minX === i) {
      break;
    }
  }

  for (let i = mapWidth - 1; i >= 0; i--) {
    for (let j = mapHeight - 1; j >= 0; j--) {
      if (map[j][i] !== SOIL) {
        maxX = i;
        break;
      }
    }
    if (maxX === i) {
      break;
    }
  }

  for (let j = 0; j < mapHeight; j++) {
    for (let i = 0; i < mapWidth; i++) {
      if (map[j][i] !== SOIL) {
        minY = j;
        break;
      }
    }
    if (minY === j) {
      break;
    }
  }

  for (let j = mapHeight - 1; j >= 0; j--) {
    for (let i = mapWidth - 1; i >= 0; i--) {
      if (map[j][i] !== SOIL) {
        maxY = j;
        break;
      }
    }
    if (maxY === j) {
      break;
    }
  }

  return {width: maxX - minX + 1 < 0 ? 0 : maxX - minX + 1,
         height: maxY - minY + 1 < 0 ? 0 : maxY - minY + 1};
}

function _generateMap(width, height) {
  // 1. fill map with soil
  const map = _getArray(width, height, () => SOIL);

  // 2. fill center of the map with a rectangle room
  let w = _getRandomInt(5, 20);
  let h = _getRandomInt(5, 20);
  let x = Math.floor((width - w) / 2);
  let y = Math.floor((height - h) / 2);
  _fillRect(map, x, y, w, h);

  let complete = false;
  let fit = false;
  let x1;
  let y1;
  let x2;
  let y2;

  while (!complete) {
    fit = false;
    while (!fit) {
      // 3. find a random wall on any room
      ({x, y} = _getWall(map, width, height));

      // 4. get a random rectangle room
      w = _getRandomInt(5, 20);
      h = _getRandomInt(5, 20);

      // 5. see if it fit in map
      if (map[y - 1][x] === SPACE) { // GOES DOWN
        x1 = _getRandomInt(x - w + 1, x + 1);
        y1 = y + 1;
        x2 = x1 + w - 1;
        y2 = y1 + h - 1;
        fit = _checkFit(map, width, height, x1 - 1, y1 - 1, x2 + 1, y2 + 1);
      }
      if (map[y + 1][x] === SPACE) { // GOES UP
        x1 = _getRandomInt(x - w + 1, x + 1);
        y2 = y - 1;
        y1 = y2 - h + 1;
        x2 = x1 + w - 1;
        fit = _checkFit(map, width, height, x1 - 1, y1 - 1, x2 + 1, y2 + 1);
      }
      if (map[y][x - 1] === SPACE) { // GOES RIGHT
        y1 = _getRandomInt(y - h + 1, y + 1);
        x1 = x + 1;
        y2 = y1 + h - 1;
        x2 = x1 + w - 1;
        fit = _checkFit(map, width, height, x1 - 1, y1 - 1, x2 + 1, y2 + 1);
      }
      if (map[y][x + 1] === SPACE) { // GOES LEFT
        y1 = _getRandomInt(y - h + 1, y + 1);
        x2 = x - 1;
        x1 = x2 - w + 1;
        y2 = y1 + h - 1;
        fit = _checkFit(map, width, height, x1 - 1, y1 - 1, x2 + 1, y2 + 1);
      }

      // 6. if fit continue, if not go back to 3.
    }

    // 7. draw the room on map
    _fillRect(map, x, y, 1, 1);
    _fillRect(map, x1, y1, x2 - x1 + 1, y2 - y1 + 1);

    // 8. go back to 3. until dungeon generate complete
    const {width: currentWidth, height: currentHeight} = _getCurrentMapSize(map, width, height);
    if (currentWidth >= width * 0.85 && currentHeight >= height * 0.85) {
      complete = true;
    }
  }

  // 9. add stairs

  // 10. add monsters and items

  return map;
}

const initialMapState = _generateMap(MAP_WIDTH, MAP_HEIGHT);

function map(state = initialMapState, action) {
  return state;
}

