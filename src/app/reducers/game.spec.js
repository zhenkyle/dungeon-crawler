describe('game reducer', () => {
  const mapWithARoom = [[{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
                        [{type: SOIL}, {type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
                        [{type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
                        [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}]];

  const someThings = [[{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                           [{type: TRANS}, {type: ENEMY, id: 0}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                           [{type: TRANS}, {type: TRANS}, {type: MEDICINE, capacity: 50}, {type: TRANS}, {type: TRANS}],
                           [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}]];

  const someOtherThings = [[{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                     [{type: TRANS}, {type: WEAPON, name: "wood stick", attack: 10}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
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

  it('should handle FIGHT when nobody get killed', () => {
    const map = mapWithARoom;
    const things = someThings;
    const player = {x: 2, y: 1, health: 50, attack: 10, exps: 0, level: 1, weapon: null, nextLevelExps: 50};
    const enemies = [{type: ENEMY, life: 50, health: 50, attack: 10}];
    const state = {map, things, player, enemies, message: ""};
    const newState = game(state, {type: FIGHT, direction: LEFT});
    expect(newState.message).toBe("");
    expect(newState.enemies[0]).toEqual({type: ENEMY, life: 50, health: 40, attack: 10});
    expect(newState.player).toEqual({x: 2, y: 1, health: 40, attack: 10, exps: 0, level: 1, weapon: null, nextLevelExps: 50});
    expect(newState.things[1][1]).toEqual({type: ENEMY, id: 0});
  });

  it('should handle FIGHT player kill enemy', () => {
    const map = mapWithARoom;
    const things = someThings;
    const player = {x: 2, y: 1, health: 50, attack: 50, exps: 0, level: 1, weapon: null, nextLevelExps: 50};
    const enemies = [{type: ENEMY, life: 50, health: 50, attack: 10}];
    const state = {map, things, player, enemies, message: ""};
    deepFreeze(state);
    const newState = game(state, {type: FIGHT, direction: LEFT});
    expect(newState.message).toBe("");
    expect(newState.enemies[0]).toEqual({type: ENEMY, life: 50, health: 0, attack: 10});
    expect(newState.player).toEqual({x: 1, y: 1, health: 50, attack: 20, exps: 0, level: 2, weapon: null, nextLevelExps: 100});
    expect(newState.things[1][1]).toEqual({type: TRANS});
  });

  it('should handle FIGHT player killed by enemy', () => {
    const map = mapWithARoom;
    const things = someThings;
    const player = {x: 2, y: 1, health: 50, attack: 10, exps: 0, level: 1, weapon: null, nextLevelExps: 50};
    const enemies = [{type: ENEMY, life: 50, health: 50, attack: 50}];
    const state = {map, things, player, enemies, message: ""};
    deepFreeze(state);
    const newState = game(state, {type: FIGHT, direction: LEFT});
    expect(newState.message).toBe("You've been killed. Better luck next time.");
    expect(newState.enemies[0]).toEqual({type: ENEMY, life: 50, health: 40, attack: 50});
    expect(newState.player).toEqual({x: 2, y: 1, health: 0, attack: 10, exps: 0, level: 1, weapon: null, nextLevelExps: 50});
    expect(newState.things[1][1]).toEqual({type: ENEMY, id: 0});
  });

  it('should handle EAT medicine', () => {
    const map = mapWithARoom;
    const things = someThings;
    expect(things[2][2]).toEqual({type: MEDICINE, capacity: 50});
    const player = {x: 2, y: 1, health: 50};
    const state = {map, things, player};
    deepFreeze(state);
    const newState = game(state, {type: EAT, direction: DOWN});
    expect(newState.player).toEqual({x: 2, y: 2, health: 100});
    expect(newState.things[2][2]).toEqual({type: TRANS});
  });

  it('should handle PICKUP weapon', () => {
    const map = mapWithARoom;
    const things = someOtherThings;
    expect(things[1][1]).toEqual({type: WEAPON, name: "wood stick", attack: 10});
    const player = {x: 2, y: 1, level: 1, attack: 10, weapon: null};
    const state = {map, things, player};
    deepFreeze(state);
    const newState = game(state, {type: PICKUP, direction: LEFT});
    expect(newState.player).toEqual({x: 1, y: 1, level: 1, attack: 20, weapon: {type: WEAPON, name: "wood stick", attack: 10}});
    expect(newState.things[1][1]).toEqual({type: TRANS});
  });
});
