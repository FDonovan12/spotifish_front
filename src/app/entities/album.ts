import { ArtistOutputBase } from './artist';
import { LikeableItemBase } from './likeable-item';
import { PermissionEntity } from './permission-entity';
import { SongAlbumBase, SongAlbumOutputBase } from './song-album';

export interface AlbumOutputBase extends LikeableItemBase, PermissionEntity {
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
