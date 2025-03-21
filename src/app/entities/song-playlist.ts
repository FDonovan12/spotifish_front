import { PermissionEntity } from './permission-entity';
import { PlaylistBase, PlaylistOutputBase } from './playlist';
import { SongBase, SongOutputBase } from './song';

export interface SongPlaylistBase {
    position: number;
    createdAt: Date;
    song: SongBase;
    playlist: PlaylistBase;
    slug: string;
}

export interface SongPlaylistOutputBase extends SongPlaylistBase, PermissionEntity {
    song: SongOutputBase;
    playlist: PlaylistOutputBase;
}
