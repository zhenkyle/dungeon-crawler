describe('game actions', () => {
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
    expect(downStairs(UP)).toEqual({
      type: DOWN_STAIRS,
      direction: UP
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
        map:
          [[{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
           [{type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
           [{type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
           [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}]],
        things:
          [[{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
           [{type: TRANS}, {type: MEDICINE}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
           [{type: TRANS}, {type: TRANS}, {type: ENEMY}, {type: TRANS}, {type: TRANS}],
           [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}]],
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
        map:
          [[{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
           [{type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
           [{type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
           [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}]],
        things:
          [[{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
           [{type: TRANS}, {type: MEDICINE}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
           [{type: TRANS}, {type: TRANS}, {type: ENEMY}, {type: TRANS}, {type: TRANS}],
           [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}]],
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
        map:
          [[{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
           [{type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
           [{type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
           [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}]],
        things:
          [[{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
           [{type: TRANS}, {type: MEDICINE}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
           [{type: TRANS}, {type: TRANS}, {type: ENEMY}, {type: TRANS}, {type: TRANS}],
           [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}]],
        player: {x: 1, y: 1}
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
        map:
          [[{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
           [{type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
           [{type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
           [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}]],
        things:
          [[{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
           [{type: TRANS}, {type: MEDICINE}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
           [{type: TRANS}, {type: TRANS}, {type: STAIRS}, {type: TRANS}, {type: TRANS}],
           [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}]],
        player: {x: 2, y: 1}
      }
    });
    fn(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({type: DOWN_STAIRS, direction: DOWN});
  });

  it('handleMove should create pickup action', () => {
    const fn = handleMove(LEFT);
    expect(typeof fn).toBe('function');
    const dispatch = jasmine.createSpy('spy');
    const getState = () => ({
      game: {
        map:
          [[{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
           [{type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
           [{type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
           [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}]],
        things:
          [[{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
           [{type: TRANS}, {type: WEAPON}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
           [{type: TRANS}, {type: TRANS}, {type: ENEMY}, {type: TRANS}, {type: TRANS}],
           [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}]],
        player: {x: 2, y: 1}
      }
    });
    fn(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({type: PICKUP, direction: LEFT});
  });
});
