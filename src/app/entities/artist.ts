import { AlbumOutputBase, AlbumOutputList } from './album';
import { Type } from './permission-entity';
import { SongArtistBase, SongArtistOutputBase } from './song-artist';
import { UserBase, UserOutputBase } from './user';

export interface ArtistBase extends UserOutputBase {}
export interface ArtistOutputBase extends UserOutputBase {
    type: Type.artist;
}

export interface ArtistOutputList extends ArtistOutputBase {}
export interface ArtistOutputShow extends ArtistOutputBase {
    albums: AlbumOutputList[];
    songArtists: SongArtistOutputBase[];
}

export interface ArtistCreate {
    name: string;
    description: string;
    image: string;
    artistSlug: string;
}

export interface ArtistEdit extends ArtistCreate {}
