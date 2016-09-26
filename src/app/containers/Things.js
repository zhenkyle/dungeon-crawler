const bindActionCreators = Redux.bindActionCreators;
const connect = ReactRedux.connect;

function mapStateToPropsThings(state) {
  return {
    data: state.game.things
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