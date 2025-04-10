import { PermissionEntity, Type } from './permission-entity';
import { PlaylistBase, PlaylistOutputBase } from './playlist';

export interface SharedBase {
    expireAt: Date;
    remainingInvitation: number;
    playlist: PlaylistBase;
    slug: string;
}

export interface SharedOutputBase extends SharedBase, PermissionEntity {
    type: Type.shared;
    playlist: PlaylistOutputBase;
    remainingInvitation: number;
    expireAt: Date;
    slug: string;
}

export interface SharedInput {
    playlistSlug: string;
    remainingInvitation: number;
    expireAt: Date;
}
