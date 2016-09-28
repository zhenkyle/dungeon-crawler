function toggleDarkness() {
  return {type: TOGGLE_DARKNESS};
}

function playerMove(direction) {
  return {type: PLAYER_MOVE, direction};
}

function downStairs(direction) {
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
    const {game, player} = state;
    const {x, y} = getNewPosition(player, direction);

    if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) {
      return;
    }
    switch (game.map[y][x].type) {
      case SPACE:
        dispatch(playerMove(direction));
        break;
      case STAIRS:
        dispatch(downStairs(direction));
        break;
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
