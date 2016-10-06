const Provider = ReactRedux.Provider;
const store = Redux.createStore(rootReducer, Redux.compose(
  Redux.applyMiddleware(ReduxThunk.default),
  window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
ReactDOM.render(
  <Provider store={store}>
    <ConnApp/>
  </Provider>,
  document.getElementById('root')
);
