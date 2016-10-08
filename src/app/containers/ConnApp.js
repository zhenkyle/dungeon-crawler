const connect = ReactRedux.connect;

function mapStateToPropsApp(state) {
  const playerHealth = state.game.player.health;
  const bossHealth = state.game.enemies[state.game.enemies.length - 1].health;
  const dungeonFloor = state.game.dungeonFloor;
  const playerAlive = playerHealth > 0;
  const bossAlive = !(dungeonFloor === 4 && bossHealth < 0);
  let message = "";
  if (!playerAlive) {
    message = "You've been killed, better luck next time.";
  } else if (!bossAlive) {
    message = "Congratulations, you win! Now begin new game.";
  }

  return {playerAlive, bossAlive, message};
}

function mapDispatchToPropsApp(dispatch) {
  return {
    onDocumentKeyDown: direction => {
      dispatch(handleMove(direction));
    }
  };
}

const ConnApp = connect(
  mapStateToPropsApp,
  mapDispatchToPropsApp
)(App);
