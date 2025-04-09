import { defaultPermission, Type } from './permission-entity';
import { SluggerEntity } from './slugger-entity';
import { StrictBuilder } from 'builder-pattern';

export interface LikeableItemBase {
    name: string;
    slug: string;
    isLiked: IsLiked;
}

export interface LikeableItemOutputBase extends SluggerEntity, LikeableItemBase {
    image: string;
    type: Type.album | Type.artist | Type.song | Type.user | Type.playlist;
}

interface IsLiked {
    liked: boolean;
}

export function defaultIsLiked() {
    return StrictBuilder<IsLiked>().liked(false);
}

export function defaultLikeableItemOutputBase() {
    return StrictBuilder<LikeableItemOutputBase>()
        .name('name')
        .slug('slug')
        .isLiked(defaultIsLiked().build())
        .image('image')
        .permission(defaultPermission().build())
        .type(Type.album);
}
