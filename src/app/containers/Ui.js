const connect = ReactRedux.connect;

function mapStateToPropsUI(state) {
  const {player} = state.game;
  const mapWidth = MAP_WIDTH;
  const mapHeight = MAP_HEIGHT;
  const {x, y} = player;
  const data = getArray(mapWidth, mapHeight, () => ({type: TRANS}));
  data[y][x] = {type: PLAYER};

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

const Ui = connect(
  mapStateToPropsUI
)(Board);
