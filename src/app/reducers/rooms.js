const initialRooms = [];

// Return a random integer between min (included) and max (excluded)
function _getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function _generateARoom() {
  return {
    top: 0,
    left: 0,
    bottom: _getRandomInt(5, 20),
    right: _getRandomInt(5, 20)
  };
}

function _generateAnotherRoom(rooms) {
  const i = _getRandomInt(0, rooms.length);
  const side = _getRandomInt(0, 4);
  const width = _getRandomInt(5, 20);
  const heigth = _getRandomInt(5, 20);
  let top;
  let left;
  let bottom;
  let right;
  let offsetX;
  let offsetY;

  switch (side) {
    case TOP:
      offsetX = _getRandomInt(rooms[i]);
      break;
    case RIGHT:
      break;
    case BOTTOM:
      break;
    case LEFT:
      break;
    default:
      break;
  }
  return {
    top: 0,
    left: 0,
    bottom: _getRandomInt(5, 20),
    right: _getRandomInt(5, 20)
  };
}

function rooms(state = initialRooms, action) {
  return state;
}
