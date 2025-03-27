import { Pipe, PipeTransform } from '@angular/core';
import { SongArtistOutputBase } from '../../entities/song-artist';

@Pipe({
    name: 'songArtists',
    standalone: true,
})
export class SongArtistsPipe implements PipeTransform {
    transform(songArtists: SongArtistOutputBase[], ...args: unknown[]): string {
        return songArtists.map((songArtist) => songArtist.artist.name).join(', ');
    }
}
