import { add2 } from './add';

describe('add2', () => {
  it('adds 2', () => {
    expect(add2(3)).toBe(5);
  });

  it('handles non-numbers', () => {
    expect(add2({})).toBe(2);
  });
});
