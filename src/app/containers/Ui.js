const bindActionCreators = Redux.bindActionCreators;
const connect = ReactRedux.connect;

function mapStateToPropsUI(state) {
  const {mapWidth, mapHeight, player} = state.game;
  const {x, y} = player;
  const data = getArray(mapWidth, mapHeight, () => TRANS);
  data[y][x] = PLAYER;
  return {
    data
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
