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
    album,
    artist,
    contributor,
    historical,
    musicalGenre,
    playlist,
    shared,
    song,
    user,
}
