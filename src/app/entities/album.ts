import { ArtistBase, ArtistOutputBase } from './artist';
import { LikeableItemBase } from './likeable-item';
import { PermissionEntity } from './permission-entity';
import { SongAlbumBase, SongAlbumOutputBase } from './song-album';

export interface AlbumBase extends LikeableItemBase {
    description: string;
    image: string;
    createdAt: Date;
    artist: ArtistBase;
    songAlbums: SongAlbumBase[];
}

export interface AlbumOutputBase extends AlbumBase, PermissionEntity {
    artist: ArtistOutputBase;
    songAlbums: SongAlbumOutputBase[];
}
