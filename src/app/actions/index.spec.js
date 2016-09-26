describe('game actions', () => {
  it('toggleDarkness should create TOGGLE_DARKNESS action', () => {
    expect(toggleDarkness()).toEqual({
      type: TOGGLE_DARKNESS
    });
  });

  it('palyerMove should create PLAYER_MOVE action', () => {
    expect(palyerMove(UP)).toEqual({
      type: PLAYER_MOVE,
      direction: UP
    });
  });
});
