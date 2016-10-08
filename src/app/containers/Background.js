const connect = ReactRedux.connect;

function mapStateToPropsBackground(state) {
  return {
    data: state.game.map
  };
}

const Background = connect(
  mapStateToPropsBackground
)(Board);
