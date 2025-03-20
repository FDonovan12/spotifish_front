import { AlbumOutputList } from './album';
import { ArtistBase, ArtistOutputBase } from './artist';
import { PlaylistOutputBase } from './playlist';
import { SongOutputBase } from './song';

export interface CustomResponse<T> {
    code: number;
    body: T;
}
export interface CustomListResponse<T> {
    code: number;
    body: T[];
    pagesElement: number;
    currentPages: number;
    previousPage: null;
    firstPage: null;
    nextPage: null;
    lastPage: null;
    totalPages: number;
    totalElements: number;
}

export interface MapLikeableItem {
    artists: ArtistOutputBase[];
    songs: SongOutputBase[];
    albums: AlbumOutputList[];
    playlists: PlaylistOutputBase[];
}
