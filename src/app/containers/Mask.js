const bindActionCreators = Redux.bindActionCreators;
const connect = ReactRedux.connect;

function mapStateToPropsMask(state) {
  const {mapWidth, mapHeight, player} = state.game;
  const {x, y} = player;
  const data = getArray(mapWidth, mapHeight, () => BLACK);
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
  return {
    data
  };
}

function mapDispatchToPropsMask(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
}

const Mask = connect(
  mapStateToPropsMask,
  mapDispatchToPropsMask
)(Board);
