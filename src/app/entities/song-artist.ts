import { ArtistBase, ArtistOutputBase } from './artist';
import { Type } from './permission-entity';
import { SluggerEntity } from './slugger-entity';
import { SongBase, SongOutputBase } from './song';

export interface SongArtistBase extends SluggerEntity {
    isPrincipalArtist: boolean;
    song: SongBase;
    artist: ArtistBase;
    slug: string;
}

export interface SongArtistOutputBase extends SongArtistBase {
    type: Type.artist;
    song: SongOutputBase;
    artist: ArtistOutputBase;
}
