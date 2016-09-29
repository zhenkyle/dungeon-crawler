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
    let map = [[{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
               [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
               [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
               [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}]];
    expect(_checkFit(map, 5, 4, 0, 0, 4, 3)).toBe(true);
    expect(_checkFit(map, 5, 4, 0, 0, 5, 4)).toBe(false);
    map = [[{type: SPACE}, {type: SPACE}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
           [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
           [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
           [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}]];
    expect(_checkFit(map, 5, 4, 0, 0, 4, 3)).toBe(false);
  });

  it('_fillRect should work', () => {
    const map = [[{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
                 [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
                 [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
                 [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}]];
    const after = [[{type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SPACE}],
                   [{type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SPACE}],
                   [{type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SPACE}],
                   [{type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SPACE}]];
    _fillRect(map, 0, 0, 5, 4);
    expect(map).toEqual(after);
  });

  it('_getCurrentMapSize should work', () => {
    let map = [[{type: SOIL}, {type: SPACE}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
               [{type: SOIL}, {type: SPACE}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
               [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SPACE}, {type: SOIL}],
               [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SPACE}, {type: SOIL}]];
    let width;
    let height;
    ({width, height} = _getCurrentMapSize(map, 5, 4));
    expect(width).toEqual(3);
    expect(height).toEqual(4);
    map = [[{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
           [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
           [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
           [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}]];
    ({width, height} = _getCurrentMapSize(map, 5, 4));
    expect(width).toEqual(0);
    expect(height).toEqual(0);
  });

  it('should handle initial state', () => {
    const g = game(undefined, {});
    expect(g.map.length).toBe(MAP_HEIGHT);
    expect(g.map[0].length).toBe(MAP_WIDTH);
  });

  it('should handle PLAYER_MOVE', () => {
    const map = [[{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
                 [{type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
                 [{type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
                 [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}]];
    const things = [[{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
             [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
             [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
             [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}]];
    expect(
      game({
        map,
        things,
        player: {x: 1, y: 1}},
        {
          type: PLAYER_MOVE,
          direction: RIGHT
        })
    ).toEqual({
      map,
      things,
      player: {x: 2, y: 1}});
  });

  it('should handle DOWN_STAIRS', () => {
    const map = [[{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
                 [{type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
                 [{type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
                 [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}]];
    const things = [[{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
             [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: STAIRS}, {type: TRANS}],
             [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
             [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}]];
    const player = {x: 1, y: 1};
    const {map: newMap, things: newThings, player: newPlayer} = game({
      map,
      things,
      player},
      {
        type: DOWN_STAIRS,
        direction: RIGHT
      });

    expect(newMap).toBeDefined();
    expect(newThings).toBeDefined();
    expect(newPlayer).toBeDefined();
    expect(newMap).not.toEqual(map);
    expect(newThings).not.toEqual(things);
    expect(newPlayer).not.toEqual(player);
  });
});
