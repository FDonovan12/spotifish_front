import { ArtistOutputBase } from './artist';
import { LikeableItemOutputBase } from './likeable-item';
import { SongAlbumOutputBase } from './song-album';

export interface AlbumOutputBase extends LikeableItemOutputBase {
    image: string;
}

export interface AlbumBase extends AlbumOutputBase {}

export interface AlbumOutputList extends AlbumOutputBase {
    artist: ArtistOutputBase;
}
export interface AlbumOutputShow extends AlbumOutputBase {
    artist: AlbumOutputBase;
    songAlbums: SongAlbumOutputBase[];
}

export interface AlbumCreate {
    name: string;
    description: string;
    image: string;
    artistSlug: string;
}

export interface AlbumEdit extends AlbumCreate {}
