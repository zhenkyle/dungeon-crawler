const bindActionCreators = Redux.bindActionCreators;
const connect = ReactRedux.connect;

function mapStateToPropsThings(state) {
  const {mapWidth, mapHeight} = state.game;
  const {x: playerX, y: playerY} = state.game.player;
  const viewWidth = VIEW_WIDTH;
  const viewHeight = VIEW_HEIGHT;
  const {left, top} = getOffset(playerX, playerY, mapWidth, mapHeight, viewWidth, viewHeight);
  return {
    data: state.game.things,
    left: left * 10,
    top: top * 10
  };
}

function mapDispatchToPropsThings(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
}

const Things = connect(
  mapStateToPropsThings,
  mapDispatchToPropsThings
)(Board);
