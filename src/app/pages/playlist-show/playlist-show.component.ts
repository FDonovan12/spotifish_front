import { Component, HostListener, inject, input, Input, Signal } from '@angular/core';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { PlaylistOutputBase } from '../../entities/playlist';
import { DatePipe } from '@angular/common';
import { LikeButtonComponent } from '../../components/like-button/like-button.component';
import { TableResizeService } from '../../services/TableResize/table-resize.service';
import { ListArtistsComponent } from '../../components/list-artists/list-artists.component';

@Component({
    selector: 'app-playlist-show',
    standalone: true,
    imports: [DatePipe, LikeButtonComponent, ListArtistsComponent],
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
        setTimeout(() => {
            this.tableResizeService.updateDisplay();
        }, 0);
    }
}
