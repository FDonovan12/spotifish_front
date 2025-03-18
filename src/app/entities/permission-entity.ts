export interface PermissionEntity {
    type: string;
    permission: Permission;
}

export interface Permission {
    canEdit: boolean;
    canDelete: boolean;
    idEntity: string;
}
