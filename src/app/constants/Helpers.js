function getArray(x, y, func) {
  return [...Array(y)].map(() => [...Array(x)].map(() => func()));
}

function getOffset(playerX, playerY, mapWidth, mapHeight, viewWidth, viewHeight) {
  let left = 0;
  let top = 0;
  if (playerY < Math.floor(viewHeight / 2)) {
    top = 0;
  } else if (playerY >= Math.floor(viewHeight / 2) && playerY < mapHeight - Math.floor(viewHeight / 2)) {
    top = Math.floor(viewHeight / 2) - playerY;
  } else {
    top = Math.floor(viewHeight) - mapHeight;
  }

  if (playerX < Math.floor(viewWidth / 2)) {
    left = 0;
  } else if (playerX >= Math.floor(viewWidth / 2) && playerX < mapWidth - Math.floor(viewWidth / 2)) {
    left = Math.floor(viewWidth / 2) - playerX;
  } else {
    left = Math.floor(viewWidth) - mapWidth;
  }

  return {left, top};
}

function getNewPosition({x, y}, direction) {
  switch (direction) {
    case UP:
      y -= 1;
      break;
    case RIGHT:
      x += 1;
      break;
    case DOWN:
      y += 1;
      break;
    case LEFT:
      x -= 1;
      break;
    default:
      break;
  }
  return {x, y};
}

// Return a random integer between min (included) and max (excluded)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getWall(map, mapWidth, mapHeight) {
  let found = false;
  let x;
  let y;
  while (!found) {
    x = getRandomInt(1, mapWidth - 1);
    y = getRandomInt(1, mapHeight - 1);
    if (map[y][x].type === SOIL &&
      (map[y - 1][x].type === SPACE ||
      map[y + 1][x].type === SPACE ||
      map[y][x - 1].type === SPACE ||
      map[y][x + 1].type === SPACE)) {
      found = true;
    }
  }
  return {x, y};
}

function checkFit(map, mapWidth, mapHeight, x1, y1, x2, y2, fitType) {
  if (x1 < 0 || x2 > mapWidth - 1 || y1 < 0 || y2 > mapHeight - 1) {
    return false;
  }
  for (let i = x1; i <= x2; i++) {
    for (let j = y1; j <= y2; j++) {
      if (map[j][i].type !== fitType) {
        return false;
      }
    }
  }
  return true;
}

function fillRect(map, x, y, w, h, thing) {
  for (let i = x; i < x + w; i++) {
    for (let j = y; j < y + h; j++) {
      map[j][i] = thing;
    }
  }
}

function getCurrentMapSize(map, mapWidth, mapHeight) {
  let minX = mapWidth - 1;
  let minY = mapHeight - 1;
  let maxX = 0;
  let maxY = 0;

  for (let i = 0; i < mapWidth; i++) {
    for (let j = 0; j < mapHeight; j++) {
      if (map[j][i].type !== SOIL) {
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
      if (map[j][i].type !== SOIL) {
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
      if (map[j][i].type !== SOIL) {
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
      if (map[j][i].type !== SOIL) {
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

function generateMap(width, height) {
  // 1. fill map with soil
  const map = getArray(width, height, () => ({type: SOIL}));

  // 2. fill center of the map with a rectangle room
  let w = getRandomInt(5, 20);
  let h = getRandomInt(5, 20);
  let x = Math.floor((width - w) / 2);
  let y = Math.floor((height - h) / 2);
  fillRect(map, x, y, w, h, {type: SPACE});

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
      ({x, y} = getWall(map, width, height));
      // 4. get a random rectangle room
      w = getRandomInt(5, 20);
      h = getRandomInt(5, 20);
      // 5. see if it fit in map
      if (map[y - 1][x].type === SPACE) { // GOES DOWN
        x1 = getRandomInt(x - w + 1, x + 1);
        y1 = y + 1;
        x2 = x1 + w - 1;
        y2 = y1 + h - 1;
        fit = checkFit(map, width, height, x1 - 1, y1 - 1, x2 + 1, y2 + 1, SOIL);
      }
      if (map[y + 1][x].type === SPACE) { // GOES UP
        x1 = getRandomInt(x - w + 1, x + 1);
        y2 = y - 1;
        y1 = y2 - h + 1;
        x2 = x1 + w - 1;
        fit = checkFit(map, width, height, x1 - 1, y1 - 1, x2 + 1, y2 + 1, SOIL);
      }
      if (map[y][x - 1].type === SPACE) { // GOES RIGHT
        y1 = getRandomInt(y - h + 1, y + 1);
        x1 = x + 1;
        y2 = y1 + h - 1;
        x2 = x1 + w - 1;
        fit = checkFit(map, width, height, x1 - 1, y1 - 1, x2 + 1, y2 + 1, SOIL);
      }
      if (map[y][x + 1].type === SPACE) { // GOES LEFT
        y1 = getRandomInt(y - h + 1, y + 1);
        x2 = x - 1;
        x1 = x2 - w + 1;
        y2 = y1 + h - 1;
        fit = checkFit(map, width, height, x1 - 1, y1 - 1, x2 + 1, y2 + 1, SOIL);
      }

      // 6. if fit continue, if not go back to 3.
    }

    // 7. draw the room on map
    fillRect(map, x, y, 1, 1, {type: SPACE});
    fillRect(map, x1, y1, x2 - x1 + 1, y2 - y1 + 1, {type: SPACE});

    // 8. go back to 3. until dungeon generate complete
    const {width: currentWidth, height: currentHeight} = getCurrentMapSize(map, width, height);
    if (currentWidth >= width * 0.85 && currentHeight >= height * 0.85) {
      complete = true;
    }
  }
  return map;
}

  // 9. add stairs
  // 10. add monsters and items
function putOneThing(thing, onThings, mapWidth, mapHeight, onMap, width, height) {
  let found = false;
  let x;
  let y;
  while (!found) {
    x = getRandomInt(1, mapWidth - 1);
    y = getRandomInt(1, mapHeight - 1);
    if (checkFit(onMap, mapWidth, mapHeight, x, y, x + width - 1, y + height - 1, SPACE) &&
        checkFit(onThings, mapWidth, mapHeight, x, y, x + width - 1, y + height - 1, TRANS)) {
      found = true;
    }
  }
  fillRect(onThings, x, y, width, height, thing);
}

function getWeaponByFloor(dungeonFloor) {
  const i = getRandomInt((dungeonFloor - 1) * 2, (dungeonFloor - 1) * 2 + 1);
  return WEAPONS[i];
}

function getEnemyByFloor(dungeonFloor) {
  const life = getRandomInt(dungeonFloor * 10 + 40 - 10, dungeonFloor * 10 + 40 + 11);
  const level = dungeonFloor;
  const attack = level * 10;
  return {type: ENEMY, level, life, health: life, attack};
}

function getBossByFloor(dungeonFloor) {
  const life = getRandomInt(dungeonFloor * 30 + 40 - 10, dungeonFloor * 30 + 40 + 11);
  const level = dungeonFloor;
  const attack = level * 30;
  return {type: BOSS, level, life, health: life, attack};
}

  // add player
function calPlayerAttack(level, weapon) {
  const weaponAttack = weapon ? weapon.attack : 0;
  return level * 10 + weaponAttack;
}

function generatePlayerPosition(onMap, onThings, mapWidth, mapHeight) {
  let found = false;
  let x;
  let y;
  while (!found) {
    x = getRandomInt(1, mapWidth - 1);
    y = getRandomInt(1, mapHeight - 1);
    if (checkFit(onMap, mapWidth, mapHeight, x, y, x, y, SPACE) &&
        checkFit(onThings, mapWidth, mapHeight, x, y, x, y, TRANS)) {
      found = true;
    }
  }
  return {x, y};
}

function generateThingsAndEnemies(onMap, width, height, dungeonFloor) {
  const things = getArray(width, height, () => ({type: TRANS}));
  const enemies = [];
  // put a down stairs
  putOneThing({type: STAIRS}, things, width, height, onMap, 1, 1);
  // put a weapon for this floor
  putOneThing(getWeaponByFloor(dungeonFloor), things, width, height, onMap, 1, 1);
  // put 3 to 5 medicines
  [...Array(getRandomInt(3, 6))].map((v, i) => i).forEach(() => {
    putOneThing({type: MEDICINE, capacity: 50}, things, width, height, onMap, 1, 1);
  });
  // put 5 to 7 enemies
  [...Array(getRandomInt(5, 8))].map((v, i) => i).forEach(() => {
    const enemy = getEnemyByFloor(dungeonFloor);
    enemies.push(enemy);
    putOneThing({type: ENEMY, id: enemies.length - 1}, things, width, height, onMap, 1, 1);
  });
  if (dungeonFloor === 4) {
    // put a boss
    const boss = getBossByFloor(dungeonFloor);
    enemies.push(boss);
    putOneThing({type: BOSS, id: enemies.lenght - 1}, things, width, height, onMap, 3, 3);
  }
  return {things, enemies};
}
