import { Component, HostListener, inject, input, Input, Signal } from '@angular/core';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { PlaylistOutputBase } from '../../entities/playlist';
import { DatePipe } from '@angular/common';
import { LikeButtonComponent } from '../../components/like-button/like-button.component';
import { TableResizeService } from '../../services/TableResize/table-resize.service';
import { ListArtistsComponent } from '../../components/list-artists/list-artists.component';
import { ChangePlaylistPlayerComponent } from '../../components/change-playlist-player/change-playlist-player.component';
import { AddToPlaylistComponent } from '../../components/add-to-playlist/add-to-playlist.component';
import { SongPlaylistOutputBase } from '../../entities/song-playlist';

@Component({
    selector: 'app-playlist-show',
    standalone: true,
    imports: [
        DatePipe,
        LikeButtonComponent,
        ListArtistsComponent,
        ChangePlaylistPlayerComponent,
        AddToPlaylistComponent,
    ],
    templateUrl: './playlist-show.component.html',
    styleUrl: './playlist-show.component.css',
})
export class PlaylistShowComponent {
    slug: Signal<string> = input.required();

    private readonly playlistService: PlaylistService = inject(PlaylistService);
    private readonly tableResizeService: TableResizeService = inject(TableResizeService);

    playlist!: PlaylistOutputBase;

    @HostListener('window:resize')
    onResize() {
        this.tableResizeService.updateDisplay();
    }
    async ngOnInit(): Promise<void> {
        this.tableResizeService.updateDisplay();
        this.playlist = await this.playlistService.show(this.slug());
        this.playlist.songPlaylists = this.playlist.songPlaylists.sort((sp1, sp2) => sp1.position - sp2.position);
        setTimeout(() => {
            this.tableResizeService.updateDisplay();
        }, 0);
    }

    removeSongPlaylist(removeSongPlaylist: SongPlaylistOutputBase) {
        this.playlist.songPlaylists = this.playlist.songPlaylists.filter(
            (songPlaylist) => songPlaylist != removeSongPlaylist
        );
    }
}
