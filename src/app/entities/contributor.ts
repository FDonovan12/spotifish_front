import { PermissionEntity } from './permission-entity';
import { PlaylistBase } from './playlist';
import { UserBase } from './user';

export interface ContributorBase {
    isOwner: boolean;
    stillContributing: boolean;
    user: UserBase;
    playlist: PlaylistBase;
    slug: string;
}

export interface ContributorOutputBase extends ContributorBase, PermissionEntity {
    user: UserBase;
    playlist: PlaylistBase;
}
