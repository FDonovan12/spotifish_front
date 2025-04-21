import { ContributorBase, ContributorOutputBase } from './contributor';
import { ImageInterface } from './image-interface';
import { LikeableItemBase } from './likeable-item';
import { PermissionEntity, Type } from './permission-entity';
import { SongPlaylistOutputBase } from './song-playlist';

export interface PlaylistBase extends LikeableItemBase {
    description: string;
    image: string;
    createdAt: Date;
    isPrivate: boolean;
    contributors: ContributorBase[];
    songPlaylists: SongPlaylistOutputBase[];
    slug: string;
}

export interface PlaylistOutputBase extends PlaylistBase, PermissionEntity, ImageInterface {
    type: Type.playlist;
    contributors: ContributorOutputBase[];
    songPlaylists: SongPlaylistOutputBase[];
}
