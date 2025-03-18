import { LikeableItemBase, LikeableItemOutputBase } from './likeable-item';
import { PermissionEntity } from './permission-entity';
import { UserBase, UserOutputBase } from './user';

export interface UserLikeableItemBase {
    addAt: Date;
    user: UserBase;
    likeableItem: LikeableItemBase;
    slug: string;
}

export interface UserLikeableItemOutputBase extends UserLikeableItemBase, PermissionEntity {
    user: UserOutputBase;
    likeableItem: LikeableItemOutputBase;
}
