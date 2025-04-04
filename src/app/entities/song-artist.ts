import { ArtistBase, ArtistOutputBase } from './artist';
import { SluggerEntity } from './slugger-entity';
import { SongBase, SongOutputBase } from './song';

export interface SongArtistBase extends SluggerEntity {
    isPrincipalArtist: boolean;
    song: SongBase;
    artist: ArtistBase;
    slug: string;
}

export interface SongArtistOutputBase extends SongArtistBase {
    song: SongOutputBase;
    artist: ArtistOutputBase;
}
