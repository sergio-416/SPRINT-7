import { TmdbImagePipe } from './tmdb-image-pipe';
import { TMDB_IMAGE_SIZES } from '../../constants/tmdb';

describe('TmdbImagePipe', () => {
  let pipe: TmdbImagePipe;

  beforeEach(() => {
    pipe = new TmdbImagePipe();
  });

  it('should transform poster path to full TMDB image URL with default w500 size', () => {
    const result = pipe.transform('/abc123.jpg');
    
    expect(result).toBe('https://image.tmdb.org/t/p/w500/abc123.jpg');
  });

  it('should transform poster path with custom size', () => {
    const result = pipe.transform('/abc123.jpg', TMDB_IMAGE_SIZES.POSTER_ORIGINAL);
    
    expect(result).toBe('https://image.tmdb.org/t/p/original/abc123.jpg');
  });

  it('should transform backdrop path with custom size', () => {
    const result = pipe.transform('/backdrop123.jpg', TMDB_IMAGE_SIZES.BACKDROP_LARGE);
    
    expect(result).toBe('https://image.tmdb.org/t/p/w1280/backdrop123.jpg');
  });

  it('should return empty string for null or empty path', () => {
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform('')).toBe('');
  });

  it('should handle path without leading slash', () => {
    const result = pipe.transform('abc123.jpg');
    
    expect(result).toBe('https://image.tmdb.org/t/p/w500/abc123.jpg');
  });
});
