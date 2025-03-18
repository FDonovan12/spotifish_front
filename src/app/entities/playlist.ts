import { ContributorBase, ContributorOutputBase } from './contributor';
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

export interface PlaylistOutputBase extends PlaylistBase, PermissionEntity {
    shared: SharedOutputBase[];
    contributors: ContributorOutputBase[];
    songPlaylists: SongPlaylistOutputBase[];
}
