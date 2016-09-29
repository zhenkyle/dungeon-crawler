describe('Helpers', () => {
  it('getNewPosition', () => {
    expect(getNewPosition({x: 1, y: 1}, RIGHT)).toEqual({x: 2, y: 1});
    const player = {x: 1, y: 1};
    expect(getNewPosition(player, RIGHT)).toEqual({x: 2, y: 1});
  });
});
