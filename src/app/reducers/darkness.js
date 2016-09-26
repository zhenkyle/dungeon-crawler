const initialDarknessState = ON;

function darkness(state = initialDarknessState, action) {
  switch (action.type) {
    case TOGGLE_DARKNESS:
      state = state === ON ? OFF : ON;
      return state;
    default:
      return state;
  }
}
