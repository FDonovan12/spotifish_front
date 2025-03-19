import { PermissionEntity } from './permission-entity';

export interface LikeableItemBase {
    name: string;
    slug: string;
    isLiked: isLiked;
}

export interface LikeableItemOutputBase extends PermissionEntity, LikeableItemBase {}

interface isLiked {
    liked: boolean;
}
