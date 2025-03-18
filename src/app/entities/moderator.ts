import { ArtistBase } from './artist';
import { PermissionEntity } from './permission-entity';

export interface ModeratorBase extends ArtistBase {}

export interface ModeratorOutputBase extends ModeratorBase, PermissionEntity {}
