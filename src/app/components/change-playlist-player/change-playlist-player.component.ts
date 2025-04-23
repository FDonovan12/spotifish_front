import { Component, inject, input, Input, InputSignal, Signal, signal, WritableSignal } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';
import { AlbumOutputList } from '../../entities/album';
import { PlaylistOutputBase } from '../../entities/playlist';
import { ArtistOutputBase } from '../../entities/artist';
import { LikeableItemOutputBase } from '../../entities/likeable-item';

@Component({
    selector: 'app-change-playlist-player',
    imports: [],
    templateUrl: './change-playlist-player.component.html',
    styleUrl: './change-playlist-player.component.css',
})
export class ChangePlaylistPlayerComponent {
    album: InputSignal<AlbumOutputList | null> = input<AlbumOutputList | null>(null);
    playlist: InputSignal<PlaylistOutputBase | null> = input<PlaylistOutputBase | null>(null);
    artist: InputSignal<ArtistOutputBase | null> = input<ArtistOutputBase | null>(null);
    likeableItem: InputSignal<LikeableItemOutputBase | null> = input<LikeableItemOutputBase | null>(null);

    private readonly playerService: PlayerService = inject(PlayerService);

    public onClickChangeSongs() {
        if (this.album()) return this.playerService.fromAlbum(this.album()!);
        if (this.playlist()) return this.playerService.fromPlaylist(this.playlist()!);
        if (this.artist()) return this.playerService.fromArtist(this.artist()!);
        if (this.likeableItem()) return this.playerService.fromLikeableItem(this.likeableItem()!);
        return this.playerService.fromLikedSong();
    }
}
