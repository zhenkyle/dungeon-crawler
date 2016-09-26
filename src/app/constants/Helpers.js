function getArray(x, y, func) {
  return [...Array(y)].map(() => [...Array(x)].map(() => func()));
}
