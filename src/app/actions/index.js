function toggleDarkness() {
  return {type: TOGGLE_DARKNESS};
}

function playerMove(direction) {
  return {type: PLAYER_MOVE, direction};
}

function downStairs(map, things, player, dungeonFloor) {
  return {type: DOWN_STAIRS, direction};
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
    const {map, things, player} = game;
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
        const things = generateThings(MAP_WIDTH, MAP_HEIGHT, map);
        const player = generatePlayer(MAP_WIDTH, MAP_HEIGHT, map, things);
        dispatch(downStairs(map, things, player, getState().game.dungeonFloor + 1));
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
