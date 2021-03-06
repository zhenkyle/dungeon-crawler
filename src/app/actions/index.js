function toggleDarkness() {
  return {type: TOGGLE_DARKNESS};
}

function playerMove(direction) {
  return {type: PLAYER_MOVE, direction};
}

function downStairs(map, things, enemies, player, dungeonFloor) {
  return {type: DOWN_STAIRS, map, things, enemies, player, dungeonFloor};
}

function fight(direction) {
  return {type: FIGHT, direction};
}

function eat(direction) {
  return {type: EAT, direction};
}

function pickup(direction) {
  return {type: PICKUP, direction};
}

function handleMove(direction) {
  return (dispatch, getState) => {
    const state = getState();
    const {game} = state;
    const {map, things, enemies, player} = game;
    const {x, y} = getNewPosition(player, direction);

    if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) {
      return;
    }
    const brickType = things[y][x].type === TRANS ? map[y][x].type : things[y][x].type;
    switch (brickType) {
      case SPACE:
        dispatch(playerMove(direction));
        break;
      case STAIRS: {
        const map = generateMap(MAP_WIDTH, MAP_HEIGHT);
        const dungeonFloor = game.dungeonFloor + 1;
        const {things, enemies} = generateThingsAndEnemies(map, MAP_WIDTH, MAP_HEIGHT, dungeonFloor);
        const player = generatePlayerPosition(map, things, MAP_WIDTH, MAP_HEIGHT);
        dispatch(downStairs(map, things, enemies, player, dungeonFloor));
        break;
      }
      case ENEMY:
        dispatch(fight(direction));
        break;
      case MEDICINE:
        dispatch(eat(direction));
        break;
      case WEAPON:
        dispatch(pickup(direction));
        break;
      default:
        break;
    }
  };
}

function setMessage(message) {
  return {type: SET_MESSAGE, message};
}

function startNewGame() {
  return (dispatch, getState) => {
    const map = generateMap(MAP_WIDTH, MAP_HEIGHT);
    const dungeonFloor = 1;
    const {things, enemies} = generateThingsAndEnemies(map, MAP_WIDTH, MAP_HEIGHT, dungeonFloor);

    let player = generatePlayerPosition(map, things, MAP_WIDTH, MAP_HEIGHT);

    const health = 100;
    const level = 1;
    const exps = 0;
    const nextLevelExps = 50;
    const weapon = null;
    const attack = calPlayerAttack(level, weapon);

    player = {...player, health, level, exps, nextLevelExps, weapon, attack};

    dispatch(downStairs(map, things, enemies, player, dungeonFloor));
    setTimeout(() => {
      dispatch(setMessage(""));
    }, 5000);
  };
}
