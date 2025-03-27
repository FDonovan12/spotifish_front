import { ContributorBase, ContributorOutputBase } from './contributor';
import { ImageInterface } from './image-interface';
import { LikeableItemBase } from './likeable-item';
import { PermissionEntity } from './permission-entity';
import { SharedBase, SharedOutputBase } from './shared';
import { SongPlaylistBase, SongPlaylistOutputBase } from './song-playlist';

export interface PlaylistBase extends LikeableItemBase {
    description: string;
    image: string;
    createdAt: Date;
    isPrivate: boolean;
    shared: SharedBase[];
    contributors: ContributorBase[];
    songPlaylists: SongPlaylistBase[];
    slug: string;
}

export interface PlaylistOutputBase extends PlaylistBase, PermissionEntity, ImageInterface {
    shared: SharedOutputBase[];
    contributors: ContributorOutputBase[];
    songPlaylists: SongPlaylistOutputBase[];
}
