const connect = ReactRedux.connect;

function mapStateToPropsMask(state) {
  const {player} = state.game;
  const mapWidth = MAP_WIDTH;
  const mapHeight = MAP_HEIGHT;
  const darkness = state.darkness;
  const {x, y} = player;
  let data;
  if (darkness === OFF) {
    data = getArray(mapWidth, mapHeight, () => ({type: TRANS}));
  } else {
    data = getArray(mapWidth, mapHeight, () => ({type: BLACK}));
    const shap = [[{type: BLACK}, {type: BLACK}, {type: BLACK}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: BLACK}, {type: BLACK}, {type: BLACK}],
                  [{type: BLACK}, {type: BLACK}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: BLACK}, {type: BLACK}],
                  [{type: BLACK}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: BLACK}],
                  [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                  [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                  [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                  [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                  [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                  [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                  [{type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}],
                  [{type: BLACK}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: BLACK}],
                  [{type: BLACK}, {type: BLACK}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: BLACK}, {type: BLACK}],
                  [{type: BLACK}, {type: BLACK}, {type: BLACK}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: TRANS}, {type: BLACK}, {type: BLACK}, {type: BLACK}]
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

  return {
    data
  };
}

const Mask = connect(
  mapStateToPropsMask
)(Board);
