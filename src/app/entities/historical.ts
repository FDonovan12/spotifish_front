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

export interface HistoricalInput {
    numberOflisten: number;
    listenAt: Date;
    userSlug: string;
    songSlug: string;
}
