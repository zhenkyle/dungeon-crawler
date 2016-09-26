function toggleDarkness() {
  return {type: TOGGLE_DARKNESS};
}

function palyerMove(direction) {
  return {type: PLAYER_MOVE, direction};
}
