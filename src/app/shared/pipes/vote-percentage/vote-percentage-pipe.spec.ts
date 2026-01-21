import { VotePercentagePipe } from './vote-percentage-pipe';

describe('VotePercentagePipe', () => {
  let pipe: VotePercentagePipe;

  beforeEach(() => {
    pipe = new VotePercentagePipe();
  });

  it('should convert vote average to percentage string', () => {
    const result = pipe.transform(7.5);
    
    expect(result).toBe('75%');
  });

  it('should round to nearest integer', () => {
    expect(pipe.transform(8.47)).toBe('85%');
    expect(pipe.transform(8.45)).toBe('85%'); // JavaScript Math.round() rounds .5 up
  });

  it('should handle perfect scores', () => {
    const result = pipe.transform(10);
    
    expect(result).toBe('100%');
  });

  it('should handle zero scores', () => {
    const result = pipe.transform(0);
    
    expect(result).toBe('0%');
  });

  it('should handle null or undefined values', () => {
    expect(pipe.transform(null as any)).toBe('0%');
    expect(pipe.transform(undefined as any)).toBe('0%');
  });
});
