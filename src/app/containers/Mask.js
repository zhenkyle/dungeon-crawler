const connect = ReactRedux.connect;

function mapStateToPropsMask(state) {
  const {player} = state.game;
  const mapWidth = MAP_WIDTH;
  const mapHeight = MAP_HEIGHT;
  const darkness = state.darkness;
  const {x, y} = player;
  let data;
  if (darkness === OFF) {
    data = getArray(mapWidth, mapHeight, () => TRANS);
  } else {
    data = getArray(mapWidth, mapHeight, () => BLACK);
    const shap = [[BLACK, BLACK, BLACK, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, BLACK, BLACK, BLACK],
                  [BLACK, BLACK, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, BLACK, BLACK],
                  [BLACK, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, BLACK],
                  [TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS],
                  [TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS],
                  [TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS],
                  [TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS],
                  [TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS],
                  [TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS],
                  [TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS],
                  [BLACK, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, BLACK],
                  [BLACK, BLACK, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, BLACK, BLACK],
                  [BLACK, BLACK, BLACK, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, TRANS, BLACK, BLACK, BLACK]
                  ];
    const shapWidth = shap[0].length;
    const shapHeight = shap.length;
    let maskX;
    let maskY;
    for (let j = 0; j < shapHeight; j++) {
      maskY = y + j - Math.floor(shapHeight / 2);
      if (maskY < 0 || maskY > mapHeight - 1) {
        break;
      }
      for (let i = 0; i < shapWidth; i++) {
        maskX = x + i - Math.floor(shapWidth / 2);
        if (maskX < 0 || maskX > mapWidth - 1) {
          break;
        }
        data[maskY][maskX] = shap[j][i];
      }
    }
  }

  const {x: playerX, y: playerY} = state.game.player;
  const viewWidth = VIEW_WIDTH;
  const viewHeight = VIEW_HEIGHT;
  const {left, top} = getOffset(playerX, playerY, mapWidth, mapHeight, viewWidth, viewHeight);

  return {
    data,
    left: left * 10,
    top: top * 10
  };
}

const Mask = connect(
  mapStateToPropsMask
)(Board);
