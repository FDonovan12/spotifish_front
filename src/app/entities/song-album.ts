import { AlbumBase, AlbumOutputBase } from './album';
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
    song: SongOutputBase;
    album: AlbumOutputBase;
}
