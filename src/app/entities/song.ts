import { LikeableItemBase } from './likeable-item';
import { MusicalGenreBase, MusicalGenreOutputBase } from './musical-genre';
import { PermissionEntity } from './permission-entity';
import { SongAlbumBase, SongAlbumOutputBase } from './song-album';
import { SongArtistBase, SongArtistOutputBase } from './song-artist';
import { SongPlaylistBase, SongPlaylistOutputBase } from './song-playlist';

export interface SongBase extends LikeableItemBase {
    path: string;
    duration: number;
    image: string;
    createdAt: Date;
    numberOfListen: number;
    songArtists: SongArtistBase[];
    songAlbums: SongAlbumBase[];
    songPlaylists: SongPlaylistBase[];
    musicalGenres: MusicalGenreBase[];
}

export interface SongOutputBase extends SongBase, PermissionEntity {
    songArtists: SongArtistOutputBase[];
    songAlbums: SongAlbumOutputBase[];
    songPlaylists: SongPlaylistOutputBase[];
    musicalGenres: MusicalGenreOutputBase[];
}

export interface SongCreate {
    songArtists: SongArtistOutputBase[];
    songAlbums: SongAlbumOutputBase[];
    songPlaylists: SongPlaylistOutputBase[];
    musicalGenres: MusicalGenreOutputBase[];
}
