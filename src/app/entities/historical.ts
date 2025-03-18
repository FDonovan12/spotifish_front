import { PermissionEntity } from './permission-entity';
import { SongBase, SongOutputBase } from './song';
import { UserBase, UserOutputBase } from './user';

export interface ContributorBase {
    numberOflisten: number;
    listenAt: Date;
    user: UserBase;
    song: SongBase;
    slug: string;
}

export interface ContributorOutputBase extends ContributorBase, PermissionEntity {
    user: UserOutputBase;
    song: SongOutputBase;
}
