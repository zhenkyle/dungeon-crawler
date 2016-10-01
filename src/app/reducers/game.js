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
      return {...state, player: getNewPosition(state.player, action.direction)};
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
      let enemy = {...state.things[pos[y]][pos[x]]};
      const player = {...state.player};
      const tempState = {...state};

      enemy.health -= player.attack;
      if (enemy.health <= 0) {
        player.exps += enemy.life;
        if (player.exps >= player.nextLevelExps) {
          player.exps -= player.nextLevelExps;
          player.level += 1;
          player.nextLevelExps = level * 50;
          player.attack = calPlayerAttack(player.level, player.weapon);
        }
        player.x = pos[x];
        player.y = pos[y];
        enemy = {type: TRANS};
      }
      tempState.things = {...tempState.things};
      tempState.things[y][x] = enemy;

      if (enemy.health > 0) {
        player.health -= enemy.attack;
        if (player.health <= 0) {
          tempState.map = generateMap(MAP_WIDTH, MAP_HEIGHT);
          tempState.things = generateThings(MAP_WIDTH, MAP_HEIGHT, map);
          tempState.player = generatePlayer(MAP_WIDTH, MAP_HEIGHT, map, things);
          tempState.message = "You've been killed. Better luck next time.";
        }
      }
      return tempState;
    }
    default:
      return state;
  }
}
