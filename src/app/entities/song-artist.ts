import { ArtistBase, ArtistOutputBase } from './artist';
import { PermissionEntity } from './permission-entity';
import { SongBase, SongOutputBase } from './song';

export interface SongArtistBase {
    isPrincipalArtist: boolean;
    song: SongBase;
    artist: ArtistBase;
    slug: string;
}

export interface SongArtistOutputBase extends SongArtistBase, PermissionEntity {
    song: SongOutputBase;
    artist: ArtistOutputBase;
}
