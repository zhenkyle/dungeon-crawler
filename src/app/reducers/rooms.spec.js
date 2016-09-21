describe('rooms reducer', () => {
  it('_getRandomInt should return a integer between min (inclueded)and max (excluded)', () => {
    let a = _getRandomInt(1, 10);
    expect(a >= 1).toBe(true);
    expect(a).toBeLessThan(10);

    a = _getRandomInt(1, 2);
    expect(a).toBe(1);

    a = _getRandomInt(1, 1);
    expect(a).toBe(1);
  });

  it('_generateARoom should return a room', () => {
    const room = _generateARoom();
    expect(room.top).toBeDefined();
    expect(room.left).toBeDefined();
    expect(room.bottom).toBeDefined();
    expect(room.right).toBeDefined();
  });

  it('should handle initial state', () => {
    expect(
      rooms(undefined, {})
    ).toEqual([
    ]);
  });
});
