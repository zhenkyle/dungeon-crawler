describe('game actions', () => {
  it('toggleDarkness should create TOGGLE_DARKNESS action', () => {
    expect(toggleDarkness()).toEqual({
      type: TOGGLE_DARKNESS
    });
  });
});
