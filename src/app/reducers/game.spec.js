describe('game reducer', () => {
  it('_getRandomInt should return a integer between min (inclueded)and max (excluded)', () => {
    let a = _getRandomInt(1, 10);
    expect(a >= 1).toBe(true);
    expect(a).toBeLessThan(10);

    a = _getRandomInt(1, 2);
    expect(a).toBe(1);

    a = _getRandomInt(1, 1);
    expect(a).toBe(1);
  });

  it('_checkFit should work', () => {
    let map = [[0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0]];
    expect(_checkFit(map, 5, 4, 0, 0, 4, 3)).toBe(true);
    expect(_checkFit(map, 5, 4, 0, 0, 5, 4)).toBe(false);
    map = [[1, 1, 0, 0, 0],
           [1, 1, 0, 0, 0],
           [0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0]];
    expect(_checkFit(map, 5, 4, 0, 0, 4, 3)).toBe(false);
  });

  it('_fillRect should work', () => {
    const map = [[0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0]];
    const after = [[1, 1, 1, 1, 1],
             [1, 1, 1, 1, 1],
             [1, 1, 1, 1, 1],
             [1, 1, 1, 1, 1]];
    _fillRect(map, 0, 0, 5, 4);
    expect(map).toEqual(after);
  });

  it('_getCurrentMapSize should work', () => {
    let map = [[0, 1, 0, 0, 0],
             [0, 1, 0, 0, 0],
             [0, 0, 0, 1, 0],
             [0, 0, 0, 1, 0]];
    let width;
    let height;
    ({width, height} = _getCurrentMapSize(map, 5, 4));
    expect(width).toEqual(3);
    expect(height).toEqual(4);
    map = [[0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0]];
    ({width, height} = _getCurrentMapSize(map, 5, 4));
    expect(width).toEqual(0);
    expect(height).toEqual(0);
  });

  it('should handle initial state', () => {
    const g = game(undefined, {});
    expect(g.map.length).toBe(MAP_HEIGHT);
    expect(g.map[0].length).toBe(MAP_WIDTH);
  });
});
