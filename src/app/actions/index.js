function toggleDarkness() {
  return {type: TOGGLE_DARKNESS};
}

function palyerMove(direction) {
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
    // check things in the direction
    // dispatch PLAYER_MOVE, DOWN_STAIRS, EAT, PICKUP here
  };
}
