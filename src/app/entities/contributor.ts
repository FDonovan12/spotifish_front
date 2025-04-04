import { PermissionEntity, Type } from './permission-entity';
import { PlaylistBase } from './playlist';
import { UserBase } from './user';

export interface ContributorBase extends PermissionEntity {
    type: Type.contributor;
    isOwner: boolean;
    stillContributing: boolean;
    user: UserBase;
    playlist: PlaylistBase;
    slug: string;
}

export interface ContributorOutputBase extends ContributorBase {
    user: UserBase;
    playlist: PlaylistBase;
}
