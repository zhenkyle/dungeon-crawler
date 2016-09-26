const bindActionCreators = Redux.bindActionCreators;
const connect = ReactRedux.connect;

function mapStateToPropsBackground(state) {
  return {
    data: state.game.map
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
