import { ArtistBase } from './artist';
import { SluggerEntity } from './slugger-entity';

export interface ModeratorBase extends ArtistBase {}

export interface ModeratorOutputBase extends ModeratorBase, SluggerEntity {}
