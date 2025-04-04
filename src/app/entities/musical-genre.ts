import { LikeableItemBase } from './likeable-item';
import { PermissionEntity, Type } from './permission-entity';

export interface MusicalGenreBase extends LikeableItemBase, PermissionEntity {
    type: Type.musicalGenre;
    description: string;
    image: string;
}

export interface MusicalGenreOutputBase extends MusicalGenreBase {}
