const connect = ReactRedux.connect;

function mapStateToPropsThings(state) {
  const {x: playerX, y: playerY} = state.game.player;
  const mapWidth = MAP_WIDTH;
  const mapHeight = MAP_HEIGHT;
  const viewWidth = VIEW_WIDTH;
  const viewHeight = VIEW_HEIGHT;
  const {left, top} = getOffset(playerX, playerY, mapWidth, mapHeight, viewWidth, viewHeight);
  return {
    data: state.game.things,
    left: left * 10,
    top: top * 10
  };
}

const Things = connect(
  mapStateToPropsThings
)(Board);
