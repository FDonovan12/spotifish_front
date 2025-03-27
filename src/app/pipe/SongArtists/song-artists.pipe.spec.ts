import { SongArtistsPipe } from './song-artists.pipe';

describe('SongArtistsPipe', () => {
  it('create an instance', () => {
    const pipe = new SongArtistsPipe();
    expect(pipe).toBeTruthy();
  });
});
