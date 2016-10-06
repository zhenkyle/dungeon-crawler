const connect = ReactRedux.connect;

function mapStateToPropsApp(state) {
  return {};
}

function mapDispatchToPropsApp(dispatch) {
  return {
    onDocumentKeyDown: direction => {
      dispatch(handleMove(direction));
    }
  };
}

const ConnApp = connect(
  mapStateToPropsApp,
  mapDispatchToPropsApp
)(App);
