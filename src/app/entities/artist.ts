import { AlbumBase, AlbumOutputBase } from './album';
import { LikeableItemBase } from './likeable-item';
import { PermissionEntity } from './permission-entity';
import { SongAlbumBase, SongAlbumOutputBase } from './song-album';
import { SongArtistBase, SongArtistOutputBase } from './song-artist';

export interface ArtistBase extends LikeableItemBase {
    songArtists: SongArtistBase[];
    albums: AlbumBase[];
    members: ArtistBase[];
    groups: ArtistBase[];
    songAlbums: SongAlbumBase[];
}

export interface ArtistOutputBase extends ArtistBase, PermissionEntity {
    songArtists: SongArtistOutputBase[];
    albums: AlbumOutputBase[];
    members: ArtistOutputBase[];
    groups: ArtistOutputBase[];
    songAlbums: SongAlbumOutputBase[];
}
