import { Component, inject, Input, Signal } from '@angular/core';
import { PlaylistOutputBase } from '../../entities/playlist';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { SongOutputBase } from '../../entities/song';
import { SongPlaylistService } from '../../services/SongPlaylist/song-playlist.service';
import { SongPlaylistInput } from '../../entities/song-playlist';
import { StockContentService } from '../../services/StockContent/stock-content.service';

@Component({
    selector: 'app-add-to-playlist',
    standalone: true,
    imports: [],
    templateUrl: './add-to-playlist.component.html',
    styleUrl: './add-to-playlist.component.css',
})
export class AddToPlaylistComponent {
    @Input({ required: true }) song!: SongOutputBase;

    playlists!: Signal<PlaylistOutputBase[]>;

    isVisible: boolean = false;

    private readonly playlistService: PlaylistService = inject(PlaylistService);
    private readonly songPlaylistService: SongPlaylistService = inject(SongPlaylistService);
    private readonly stockContentService: StockContentService = inject(StockContentService);

    ngOnInit(): void {
        this.playlists = this.stockContentService.getPlaylistsSignal;
    }

    addToPlaylist(song: SongOutputBase, playlistEvent: Event) {
        const playlist = playlistEvent.target as HTMLInputElement;
        const songPlaylistInput: SongPlaylistInput = { songSlug: song.slug, playlistSlug: playlist.value };
        this.songPlaylistService.new(songPlaylistInput);
    }

    openMenu() {
        this.isVisible = true;
        console.log(this.playlists);
        console.log(this.playlists());
    }
}
