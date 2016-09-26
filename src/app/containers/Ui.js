const bindActionCreators = Redux.bindActionCreators;
const connect = ReactRedux.connect;

function mapStateToPropsUI(state) {
  const {mapWidth, mapHeight, player} = state.game;
  const {x, y} = player;
  const data = getArray(mapWidth, mapHeight, () => TRANS);
  data[y][x] = PLAYER;

  const {x: playerX, y: playerY} = state.game.player;
  const viewWidth = VIEW_WIDTH;
  const viewHeight = VIEW_HEIGHT;
  const {left, top} = getOffset(playerX, playerY, mapWidth, mapHeight, viewWidth, viewHeight);
  return {
    data,
    left: left * 10,
    top: top * 10
  };
}

function mapDispatchToPropsUI(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
}

const Ui = connect(
  mapStateToPropsUI,
  mapDispatchToPropsUI
)(Board);
