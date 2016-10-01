describe('Helpers', () => {
  const mapWithAllSoil = [[{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
                          [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
                          [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
                          [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}]];

  const mapWithARoom = [[{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
                        [{type: SOIL}, {type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
                        [{type: SOIL}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SOIL}],
                        [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SOIL}]];

  const mapWithAllSpace = [[{type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SPACE}],
                           [{type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SPACE}],
                           [{type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SPACE}],
                           [{type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SPACE}, {type: SPACE}]];

  const mapWithTwoRooms = [[{type: SOIL}, {type: SPACE}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
                           [{type: SOIL}, {type: SPACE}, {type: SOIL}, {type: SOIL}, {type: SOIL}],
                           [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SPACE}, {type: SOIL}],
                           [{type: SOIL}, {type: SOIL}, {type: SOIL}, {type: SPACE}, {type: SOIL}]];

  const someThings = [[{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                           [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                           [{type: TRANS}, {type: ENEMY}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                           [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}]];

  it('getArray should work', () => {
    const a = getArray(10, 5, () => 1);
    expect(a.length).toBe(5);
    expect(a[0].length).toBe(10);
    expect(a[0][0]).toBe(1);
  });

  it('getOffset should work', () => {
    const mapWidth = 200;
    const mapHeight = 80;
    const viewWidth = 100;
    const viewHeight = 50;
    let {left, top} = getOffset(0, 0, mapWidth, mapHeight, viewWidth, viewHeight);
    expect(left).toBe(0);
    expect(top).toBe(0);
    ({left, top} = getOffset(50, 25, mapWidth, mapHeight, viewWidth, viewHeight));
    expect(left).toBe(0);
    expect(top).toBe(0);
    ({left, top} = getOffset(51, 26, mapWidth, mapHeight, viewWidth, viewHeight));
    expect(left).toBe(-1);
    expect(top).toBe(-1);
    ({left, top} = getOffset(149, 54, mapWidth, mapHeight, viewWidth, viewHeight));
    expect(left).toBe(-99);
    expect(top).toBe(-29);
    ({left, top} = getOffset(150, 55, mapWidth, mapHeight, viewWidth, viewHeight));
    expect(left).toBe(-100);
    expect(top).toBe(-30);
    ({left, top} = getOffset(199, 79, mapWidth, mapHeight, viewWidth, viewHeight));
    expect(left).toBe(-100);
    expect(top).toBe(-30);
  });

  it('getNewPosition', () => {
    expect(getNewPosition({x: 1, y: 1}, RIGHT)).toEqual({x: 2, y: 1});
    const player = {x: 1, y: 1};
    expect(getNewPosition(player, RIGHT)).toEqual({x: 2, y: 1});
  });

  it('getRandomInt should return a integer between min (inclueded) and max (excluded)', () => {
    let a = getRandomInt(1, 10);
    expect(a >= 1).toBe(true);
    expect(a).toBeLessThan(10);

    a = getRandomInt(1, 2);
    expect(a).toBe(1);

    a = getRandomInt(1, 1);
    expect(a).toBe(1);
  });

  it('getWall should retun a SOIL adjacent to a SPACE', () => {
    const map = mapWithARoom;
    const {x, y} = getWall(map, 5, 4);
    expect(map[y][x].type).toBe(SOIL);
    expect(map[y - 1][x].type === SPACE ||
      map[y + 1][x].type === SPACE ||
      map[y][x - 1].type === SPACE ||
      map[y][x + 1].type === SPACE).toBe(true);
  });

  it('checkFit should work', () => {
    let map = mapWithAllSoil;
    expect(checkFit(map, 5, 4, 0, 0, 4, 3, SOIL)).toBe(true);
    expect(checkFit(map, 5, 4, 0, 0, 5, 4, SOIL)).toBe(false);
    map = mapWithARoom;
    expect(checkFit(map, 5, 4, 0, 0, 4, 3, SOIL)).toBe(false);
  });

  it('fillRect should work', () => {
    const map = mapWithAllSoil.map(row => row.map(v => ({...v})));

    const after = mapWithAllSpace;
    fillRect(map, 0, 0, 5, 4, {type: SPACE});
    expect(map).toEqual(after);
  });

  it('after fillRect mapWithAllSoil should not change', () => {
    const map = mapWithAllSoil;
    expect(map[0][0].type).toBe(SOIL);
  });

  it('getCurrentMapSize should work', () => {
    let map = mapWithTwoRooms;
    let width;
    let height;
    ({width, height} = getCurrentMapSize(map, 5, 4));
    expect(width).toEqual(3);
    expect(height).toEqual(4);
    map = mapWithAllSoil;
    ({width, height} = getCurrentMapSize(map, 5, 4));
    expect(width).toEqual(0);
    expect(height).toEqual(0);
  });

  it('generateMap should work', () => {
    const map = generateMap(100, 80);
    expect(map.length).toBe(80);
    expect(map[0].length).toBe(100);
    const {width, height} = getCurrentMapSize(map, 100, 80);
    expect(width).toBeGreaterThan(0);
    expect(height).toBeGreaterThan(0);
  });

  it('putOneThing should work', () => {
    const map = mapWithARoom.map(row => row.map(v => ({...v})));
    const things = someThings.map(row => row.map(v => ({...v})));
    const enemy = {type: ENEMY};
    putOneThing(enemy, things, 5, 4, map, 1, 1);
    let found = false;
    for (let i = 1; i < 4; i++) {
      for (let j = 1; j < 3; j++) {
        console.log(things[j][i]);
        if (things[j][i] === enemy) {
          found = true;
        }
      }
    }
    expect(found).toBe(true);
  });

  it('put a boss should work', () => {
    const map = mapWithARoom.map(row => row.map(v => ({...v})));
    const things = someThings.map(row => row.map(v => ({...v})));
    const enemy = {type: BOSS};
    putOneThing(enemy, things, 5, 4, map, 2, 2);
    let found = false;
    for (let i = 1; i < 4; i++) {
      for (let j = 1; j < 3; j++) {
        if (things[j][i] === enemy) {
          found = true;
        }
      }
    }
    expect(found).toBe(true);
  });

  it('getWeaponByFloor should work', () => {
    const weapon = getWeaponByFloor(1);
    expect(weapon).toBeDefined();
    expect(weapon.type).toBe(WEAPON);
    expect(["wood stick", "stone stick"]).toContain(weapon.name);
  });

  it('getEnemyByFloor should work', () => {
    const enemy = getEnemyByFloor(1);
    expect(enemy).toBeDefined();
    expect(enemy.type).toBe(ENEMY);
    expect(enemy.level).toBe(1);
    expect(enemy.attack).toBe(10);
    expect(enemy.life).toBeGreaterThan(39);
    expect(enemy.life).toBeLessThan(61);
    expect(enemy.life).toBe(enemy.health);
  });

  it('getBossByFloor should work', () => {
    const enemy = getBossByFloor(4);
    expect(enemy).toBeDefined();
    expect(enemy.type).toBe(BOSS);
    expect(enemy.level).toBe(4);
    expect(enemy.attack).toBe(120);
    expect(enemy.life).toBeGreaterThan(149);
    expect(enemy.life).toBeLessThan(171);
    expect(enemy.life).toBe(enemy.health);
  });

  it('calPlayerAttack should work', () => {
    const weapon = WEAPONS[0];
    const attack = calPlayerAttack(1, weapon);
    expect(attack).toBe(10 + 10);
    expect(calPlayerAttack(1)).toBe(10);
  });

  it('generatePlayerPosition should work', () => {
    const map = mapWithARoom;
    const things = someThings;
    const playerPosition = generatePlayerPosition(map, things, 5, 4);
    expect(playerPosition).toBeDefined();
    const {x, y} = playerPosition;
    expect([2, 3]).toContain(x);
    expect([1, 2]).toContain(y);
  });

  it('generateThingsAndEnemies should work', () => {
    const map = getArray(100, 80, () => ({type: SPACE}));
    const {things, enemies} = generateThingsAndEnemies(map, 100, 80, 4);
    expect(things).toBeDefined();
    expect(enemies).toBeDefined();
    expect(things.length).toBe(80);
    expect(things[0].length).toBe(100);
    expect(enemies[enemies.length - 1].type).toBe(BOSS);
  });
});
