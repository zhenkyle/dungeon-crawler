const bindActionCreators = Redux.bindActionCreators;
const connect = ReactRedux.connect;

function mapStateToPropsBackground(state) {
  return {
    data: state.map
  };
}

function mapDispatchToPropsBackground(dispatch) {
  return {
    actions: bindActionCreators({
      addTodo,
      deleteTodo,
      editTodo,
      completeTodo,
      completeAll,
      clearCompleted
    }, dispatch)
  };
}

const Background = connect(
  mapStateToPropsBackground,
  mapDispatchToPropsBackground
)(Board);
