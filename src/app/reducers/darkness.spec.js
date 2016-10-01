describe('darkness reducers', () => {
  it('should handle initial state', () => {
    const d = darkness(undefined, {});
    expect(d).toBe(ON);
  });

  it('should handle TOGGLE_DARKNESS', () => {
    const d = darkness(ON, {type: TOGGLE_DARKNESS});
    expect(d).toBe(OFF);
  });
});
