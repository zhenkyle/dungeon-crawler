const Provider = ReactRedux.Provider;
const store = Redux.createStore(rootReducer, window.devToolsExtension && window.devToolsExtension());

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
