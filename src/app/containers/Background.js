const bindActionCreators = Redux.bindActionCreators;
const connect = ReactRedux.connect;

function mapStateToPropsBackground(state) {
  const {mapWidth, mapHeight} = state.game;
  const {x: playerX, y: playerY} = state.game.player;
  const viewWidth = VIEW_WIDTH;
  const viewHeight = VIEW_HEIGHT;
  const {left, top} = getOffset(playerX, playerY, mapWidth, mapHeight, viewWidth, viewHeight);
  return {
    data: state.game.map,
    left: left * 10,
    top: top * 10
  };
}

function mapDispatchToPropsBackground(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
}

const Background = connect(
  mapStateToPropsBackground,
  mapDispatchToPropsBackground
)(Board);
