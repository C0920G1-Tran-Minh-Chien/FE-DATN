import { ArrayNumPipe } from './array-num.pipe';

describe('ArrayNumPipe', () => {
  it('create an instance', () => {
    const pipe = new ArrayNumPipe();
    expect(pipe).toBeTruthy();
  });
});
