import { PermissionEntity } from './permission-entity';
import { PlaylistBase, PlaylistOutputBase } from './playlist';

export interface SharedBase {
    expireAt: Date;
    remainingInvitation: number;
    playlist: PlaylistBase;
    slug: string;
}

export interface SharedOutputBase extends SharedBase, PermissionEntity {
    playlist: PlaylistOutputBase;
}
