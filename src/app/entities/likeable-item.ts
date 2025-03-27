import { SluggerEntity } from './slugger-entity';

export interface LikeableItemBase {
    name: string;
    slug: string;
    isLiked: isLiked;
}

export interface LikeableItemOutputBase extends SluggerEntity, LikeableItemBase {
    image?: string;
}

interface isLiked {
    liked: boolean;
}
