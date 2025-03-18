import { LikeableItemBase } from './likeable-item';
import { PermissionEntity } from './permission-entity';

export interface MusicalGenreBase extends LikeableItemBase {
    description: string;
    image: string;
}

export interface MusicalGenreOutputBase extends MusicalGenreBase, PermissionEntity {}
