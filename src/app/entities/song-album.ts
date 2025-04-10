import { AlbumBase, AlbumOutputBase } from './album';
import { Type } from './permission-entity';
import { SluggerEntity } from './slugger-entity';
import { SongBase, SongOutputBase } from './song';

export interface SongAlbumBase {
    position: number;
    createdAt: Date;
    song: SongBase;
    album: AlbumBase;
    slug: string;
}

export interface SongAlbumOutputBase extends SongAlbumBase, SluggerEntity {
    type: Type.album;
    song: SongOutputBase;
    album: AlbumOutputBase;
}
