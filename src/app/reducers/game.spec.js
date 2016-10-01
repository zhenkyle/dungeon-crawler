describe('game reducer', () => {
  const mapWithARoom = [[{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
                        [{type: SOIL}, {type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
                        [{type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
                        [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}]];

  const someThings = [[{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                           [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                           [{type: TRANS}, {type: ENEMY}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                           [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}]];

  const someOtherThings = [[{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                     [{type: TRANS}, {type: WEAPON}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                     [{type: TRANS}, {type: TRANS}, {type: STAIRS}, {type: TRANS}, {type: TRANS}],
                     [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}]];

  it('generateInitialGameState should work', () => {
    const initState = generateInitialGameState();
    expect(initState).toBeDefined();
    expect(initState.map).toBeDefined();
    expect(initState.things).toBeDefined();
    expect(initState.enemies).toBeDefined();
    expect(initState.player).toBeDefined();
    expect(initState.message).toBeDefined();
    expect(initState.dungeonFloor).toBeDefined();
  });

  it('should handle initial state', () => {
    const g = game(undefined, {});
    expect(g).toBeDefined();
    expect(g.map).toBeDefined();
    expect(g.things).toBeDefined();
    expect(g.enemies).toBeDefined();
    expect(g.player).toBeDefined();
    expect(g.message).toBeDefined();
    expect(g.dungeonFloor).toBeDefined();
    expect(g.map.length).toBe(MAP_HEIGHT);
    expect(g.map[0].length).toBe(MAP_WIDTH);
  });

  it('should handle PLAYER_MOVE', () => {
    const map = mapWithARoom;
    const things = someThings;
    expect(
      game({
        map,
        things,
        player: {x: 2, y: 1}},
        {
          type: PLAYER_MOVE,
          direction: RIGHT
        })
    ).toEqual({
      map,
      things,
      player: {x: 3, y: 1}});
  });

  it('should handle DOWN_STAIRS', () => {
    const map = mapWithARoom;
    const things = someOtherThings;
    const player = {x: 2, y: 1, health: 50};
    const enemies = [];
    const {map: newMap, things: newThings, enemies: newEnemies, player: newPlayer, dungeonFloor: newDungeonFloor} = game({
      map,
      things,
      enemies,
      player,
      message: '',
      dungeonFloor: 1
    },
      {
        type: DOWN_STAIRS,
        map: [],
        things: [],
        enemies: [1],
        player: {x: 8, y: 2},
        dungeonFloor: 2
      });
    expect(newMap).toBeDefined();
    expect(newThings).toBeDefined();
    expect(newPlayer).toBeDefined();
    expect(newMap).not.toEqual(map);
    expect(newThings).not.toEqual(things);
    expect(newEnemies).not.toEqual(enemies);
    expect(newPlayer).not.toEqual(player);
    expect(newPlayer.health).toEqual(50);
    expect(newDungeonFloor).toEqual(2);
  });
});
