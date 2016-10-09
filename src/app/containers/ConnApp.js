const connect = ReactRedux.connect;

function mapStateToPropsApp(state) {
  const playerHealth = state.game.player.health;
  const bossHealth = state.game.enemies[state.game.enemies.length - 1].health;
  const dungeonFloor = state.game.dungeonFloor;
  const playerAlive = playerHealth > 0;
  const bossAlive = !(dungeonFloor === 4 && bossHealth < 0);
  const message = state.game.message;
  return {playerAlive, bossAlive, message};
}

function mapDispatchToPropsApp(dispatch) {
  return {
    onDocumentKeyDown: direction => {
      dispatch(handleMove(direction));
    },
    onStartNewGame: () => {
      dispatch(startNewGame());
    },
    onSetMessage: message => {
      dispatch(setMessage(message));
    }
  };
}

const ConnApp = connect(
  mapStateToPropsApp,
  mapDispatchToPropsApp
)(App);
