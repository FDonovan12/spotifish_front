import { AlbumOutputBase } from './album';
import { LikeableItemBase } from './likeable-item';
import { PermissionEntity } from './permission-entity';
import { SongAlbumBase, SongAlbumOutputBase } from './song-album';
import { SongArtistBase, SongArtistOutputBase } from './song-artist';
import { UserBase, UserOutputBase } from './user';

export interface ArtistBase extends UserOutputBase {}
export interface ArtistOutputBase extends UserOutputBase {}

export interface ArtistOutputList extends ArtistOutputBase {}
export interface ArtistOutputShow extends ArtistOutputBase {
    songArtists: SongArtistBase[];
    albums: AlbumOutputBase[];
}

export interface ArtistCreate {
    name: string;
    description: string;
    image: string;
    artistSlug: string;
}

export interface ArtistEdit extends ArtistCreate {}
