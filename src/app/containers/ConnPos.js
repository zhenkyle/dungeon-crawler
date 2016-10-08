const connect = ReactRedux.connect;

function mapStateToPropsPos(state) {
  const {x: playerX, y: playerY} = state.game.player;
  const mapWidth = MAP_WIDTH;
  const mapHeight = MAP_HEIGHT;
  const viewWidth = VIEW_WIDTH;
  const viewHeight = VIEW_HEIGHT;
  const {left, top} = getOffset(playerX, playerY, mapWidth, mapHeight, viewWidth, viewHeight);
  return {
    left: left * 10,
    top: top * 10
  };
}

const ConnPos = connect(
  mapStateToPropsPos
)(Pos);
