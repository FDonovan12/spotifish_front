import { Component, HostListener, inject, input, Input, Signal, ViewChild, ViewContainerRef } from '@angular/core';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { PlaylistOutputBase } from '../../entities/playlist';
import { DatePipe } from '@angular/common';
import { LikeButtonComponent } from '../../components/like-button/like-button.component';
import { TableResizeService } from '../../services/TableResize/table-resize.service';
import { ListArtistsComponent } from '../../components/list-artists/list-artists.component';
import { ChangePlaylistPlayerComponent } from '../../components/change-playlist-player/change-playlist-player.component';
import { AddToPlaylistComponent } from '../../components/add-to-playlist/add-to-playlist.component';
import { SongPlaylistOutputBase } from '../../entities/song-playlist';
import { PopupService } from '../../services/popup/popup.service';
import { ContributorOutputBase } from '../../entities/contributor';
import { TitleSectionComponent } from '../../components/title-section/title-section.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-playlist-show',
    standalone: true,
    imports: [DatePipe, LikeButtonComponent, ListArtistsComponent, AddToPlaylistComponent, TitleSectionComponent],
    templateUrl: './playlist-show.component.html',
    styleUrl: './playlist-show.component.css',
})
export class PlaylistShowComponent {
    @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer!: ViewContainerRef;
    slug: Signal<string> = input.required();

    private readonly playlistService: PlaylistService = inject(PlaylistService);
    private readonly tableResizeService: TableResizeService = inject(TableResizeService);
    private readonly popupService: PopupService = inject(PopupService);
    private readonly router: Router = inject(Router);

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

    removePlaylist() {
        if (!confirm(`Voulez vous supprimer la playlist ${this.playlist.name}`)) return;
        this.playlistService
            .delete(this.playlist.permission.idEntity)
            .then(() => this.router.navigateByUrl('/library'));
    }

    ngAfterViewInit() {
        this.popupService.setViewContainerRef(this.popupContainer);
    }

    public get owner(): ContributorOutputBase {
        return this.playlist.contributors.filter((contributor) => contributor.isOwner)[0];
    }
}
