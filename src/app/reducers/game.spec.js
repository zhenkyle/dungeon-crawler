describe('game reducer', () => {
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
