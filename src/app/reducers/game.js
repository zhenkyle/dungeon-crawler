function generateInitialGameState() {
  const map = generateMap(MAP_WIDTH, MAP_HEIGHT);
  const {things, enemies} = generateThingsAndEnemies(map, MAP_WIDTH, MAP_HEIGHT, 1);
  let player = generatePlayerPosition(map, things, MAP_WIDTH, MAP_HEIGHT);

  const health = 100;
  const level = 1;
  const exps = 0;
  const nextLevelExps = 50;
  const weapon = null;
  const attack = calPlayerAttack(level, weapon);

  player = {...player, health, level, exps, nextLevelExps, weapon, attack};

  return {
    map,
    things,
    enemies,
    player,
    message: "",
    dungeonFloor: 1
  };
}

// const initialGameState = generateInitialGameState();
const initialGameState = generateInitialGameState();

function game(state = initialGameState, action) {
  switch (action.type) {
    case PLAYER_MOVE: {
      const pos = getNewPosition(state.player, action.direction);
      const player = {...state.player, ...pos};
      return {...state, player};
    }
    case DOWN_STAIRS: {
      const {map, things, enemies, player, dungeonFloor} = action;
      const oldPlayer = state.player;
      const nextPlayer = {...oldPlayer, ...player};
      return {...state,
        map,
        things,
        enemies,
        player: nextPlayer,
        dungeonFloor
      };
    }
    case FIGHT: {
      const pos = getNewPosition(state.player, action.direction);
      const things = state.things.map(row => row.map(v => v));
      const enemyInThings = things[pos.y][pos.x];
      const enemies = [...state.enemies];
      const enemy = {...enemies[enemyInThings.id]};
      enemies[enemyInThings.id] = enemy;
      const player = {...state.player};
      const message = state.message;

      // player attack enemy
      enemy.health -= player.attack;
      if (enemy.health <= 0) {
        player.exps += enemy.life;
        if (player.exps >= player.nextLevelExps) {
          player.exps -= player.nextLevelExps;
          player.level += 1;
          player.nextLevelExps = player.level * 50;
          player.attack = calPlayerAttack(player.level, player.weapon);
        }
        player.x = pos.x;
        player.y = pos.y;
        things[pos.y][pos.x] = TRANS_BLOCK;
      }

      // enemy attack
      if (enemy.health > 0) {
        player.health -= enemy.attack;
      }
      return {...state, enemies, things, player, message};
    }
    case EAT: {
      const pos = getNewPosition(state.player, action.direction);
      const things = state.things.map(row => row.map(v => v));
      const medicine = things[pos.y][pos.x];
      const player = {...state.player, ...pos};
      player.health += medicine.capacity;
      things[pos.y][pos.x] = TRANS_BLOCK;
      return {...state, things, player};
    }

    case PICKUP: {
      const pos = getNewPosition(state.player, action.direction);
      const things = state.things.map(row => row.map(v => v));
      const weapon = things[pos.y][pos.x];
      const player = {...state.player, ...pos};
      player.weapon = weapon;
      player.attack = calPlayerAttack(player.level, player.weapon);
      things[pos.y][pos.x] = TRANS_BLOCK;
      return {...state, things, player};
    }
    default:
      return state;
  }
}
