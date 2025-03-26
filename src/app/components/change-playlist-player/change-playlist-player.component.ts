import { Component, inject, input, Input, InputSignal, Signal, signal, WritableSignal } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';
import { AlbumOutputList } from '../../entities/album';
import { PlaylistOutputBase } from '../../entities/playlist';
import { ArtistOutputBase } from '../../entities/artist';

@Component({
    selector: 'app-change-playlist-player',
    standalone: true,
    imports: [],
    templateUrl: './change-playlist-player.component.html',
    styleUrl: './change-playlist-player.component.css',
})
export class ChangePlaylistPlayerComponent {
    album: InputSignal<AlbumOutputList | null> = input<AlbumOutputList | null>(null);
    playlist: InputSignal<PlaylistOutputBase | null> = input<PlaylistOutputBase | null>(null);
    artist: InputSignal<ArtistOutputBase | null> = input<ArtistOutputBase | null>(null);

    private readonly playerService: PlayerService = inject(PlayerService);

    public onClickChangeSongs() {
        if (this.album()) return this.playerService.fromAlbum(this.album()!);
        if (this.playlist()) return this.playerService.fromPlaylist(this.playlist()!);
        if (this.artist()) return this.playerService.fromArtist(this.artist()!);
        return;
    }
}
