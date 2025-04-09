import { StrictBuilder } from 'builder-pattern';

export interface PermissionEntity {
    type: Type;
    permission: Permission;
}

export interface Permission {
    canEdit: boolean;
    canDelete: boolean;
    idEntity: string;
}

export enum Type {
    album = 'album',
    artist = 'artist',
    contributor = 'contributor',
    historical = 'historical',
    musicalGenre = 'musicalGenre',
    playlist = 'playlist',
    shared = 'shared',
    song = 'song',
    user = 'user',
}

export function defaultPermission() {
    return StrictBuilder<Permission>().canDelete(false).canEdit(false).idEntity('identity');
}
