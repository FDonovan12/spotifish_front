import { AlbumBase, AlbumOutputBase } from './album';
import { PermissionEntity } from './permission-entity';
import { SongBase, SongOutputBase } from './song';

export interface SongAlbumBase {
    position: number;
    createdAt: Date;
    song: SongBase;
    album: AlbumBase;
    slug: string;
}

export interface SongAlbumOutputBase extends SongAlbumBase, PermissionEntity {
    song: SongOutputBase;
    album: AlbumOutputBase;
}
