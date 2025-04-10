import { Type } from './permission-entity';
import { PlaylistBase, PlaylistOutputBase } from './playlist';
import { SluggerEntity } from './slugger-entity';
import { SongBase, SongOutputBase } from './song';

export interface SongPlaylistBase {
    position: number;
    createdAt: Date;
    song: SongBase;
    playlist: PlaylistBase;
    slug: string;
}

export interface SongPlaylistOutputBase extends SongPlaylistBase, SluggerEntity {
    song: SongOutputBase;
    playlist: PlaylistOutputBase;
}

export interface SongPlaylistInput {
    songSlug: string;
    playlistSlug: string;
}
