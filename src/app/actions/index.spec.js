describe('game actions', () => {
  const mapWithARoom = [[{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
                       [{type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
                       [{type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
                       [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}]];

  const someThings = [[{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                     [{type: TRANS}, {type: MEDICINE}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                     [{type: TRANS}, {type: TRANS}, {type: ENEMY}, {type: TRANS}, {type: TRANS}],
                     [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}]];

  const someOtherThings = [[{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                     [{type: TRANS}, {type: WEAPON}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                     [{type: TRANS}, {type: TRANS}, {type: STAIRS}, {type: TRANS}, {type: TRANS}],
                     [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}]];

  it('toggleDarkness should create TOGGLE_DARKNESS action', () => {
    expect(toggleDarkness()).toEqual({
      type: TOGGLE_DARKNESS
    });
  });

  it('playerMove should create PLAYER_MOVE action', () => {
    expect(playerMove(UP)).toEqual({
      type: PLAYER_MOVE,
      direction: UP
    });
  });

  it('downStairs should create DOWN_STAIRS action', () => {
    expect(downStairs("map", "things", "enemies", "player", "dungeonFloor")).toEqual({
      type: DOWN_STAIRS,
      map: "map",
      things: "things",
      enemies: "enemies",
      player: "player",
      dungeonFloor: "dungeonFloor"
    });
  });

  it('fight should create FIGHT action', () => {
    expect(fight(UP)).toEqual({
      type: FIGHT,
      direction: UP
    });
  });

  it('eat should create EAT action', () => {
    expect(eat(UP)).toEqual({
      type: EAT,
      direction: UP
    });
  });

  it('pickup should create PICKUP action', () => {
    expect(pickup(UP)).toEqual({
      type: PICKUP,
      direction: UP
    });
  });

  it('handleMove should create PLAYER_MOVE action', () => {
    const fn = handleMove(RIGHT);
    expect(typeof fn).toBe('function');
    const dispatch = jasmine.createSpy('spy');
    const getState = () => ({
      game: {
        map: mapWithARoom,
        things: someThings,
        player: {x: 2, y: 1}
      }
    });
    fn(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({type: PLAYER_MOVE, direction: RIGHT});
  });

  it('handleMove should create fight action', () => {
    const fn = handleMove(DOWN);
    expect(typeof fn).toBe('function');
    const dispatch = jasmine.createSpy('spy');
    const getState = () => ({
      game: {
        map: mapWithARoom,
        things: someThings,
        player: {x: 2, y: 1}
      }
    });
    fn(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({type: FIGHT, direction: DOWN});
  });

  it('handleMove should not create action on invalid', () => {
    const fn = handleMove(UP);
    expect(typeof fn).toBe('function');
    const dispatch = jasmine.createSpy('spy');
    const getState = () => ({
      game: {
        map: mapWithARoom,
        things: someThings,
        player: {x: 2, y: 1}
      }
    });
    fn(dispatch, getState);
    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  it('handleMove should create downStairs action', () => {
    const fn = handleMove(DOWN);
    expect(typeof fn).toBe('function');
    const dispatch = jasmine.createSpy('spy');
    const getState = () => ({
      game: {
        map: mapWithARoom,
        things: someOtherThings,
        player: {x: 2, y: 1}
      }
    });
    fn(dispatch, getState);
    const args = dispatch.calls.first().args[0];
    expect(args.type).toBe(DOWN_STAIRS);
    expect(args.map).toBeDefined();
    expect(args.things).toBeDefined();
    expect(args.enemies).toBeDefined();
    expect(args.player).toBeDefined();
    expect(args.dungeonFloor).toBeDefined();
  });

  it('handleMove should create pickup action', () => {
    const fn = handleMove(LEFT);
    expect(typeof fn).toBe('function');
    const dispatch = jasmine.createSpy('spy');
    const getState = () => ({
      game: {
        map: mapWithARoom,
        things: someOtherThings,
        player: {x: 2, y: 1}
      }
    });
    fn(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({type: PICKUP, direction: LEFT});
  });
});
