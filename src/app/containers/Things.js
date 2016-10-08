const connect = ReactRedux.connect;

function mapStateToPropsThings(state) {
  return {
    data: state.game.things
  };
}

const Things = connect(
  mapStateToPropsThings
)(Board);
