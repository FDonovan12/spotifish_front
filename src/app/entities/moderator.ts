import { ArtistBase } from './artist';
import { Type } from './permission-entity';
import { SluggerEntity } from './slugger-entity';

export interface ModeratorBase extends ArtistBase, SluggerEntity {
    type: Type.artist;
}

export interface ModeratorOutputBase extends ModeratorBase {}
