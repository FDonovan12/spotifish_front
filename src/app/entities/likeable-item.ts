import { PermissionEntity } from './permission-entity';

export interface LikeableItemBase {
    name: string;
    slug: string;
}

export interface LikeableItemOutputBase extends PermissionEntity, LikeableItemBase {}
