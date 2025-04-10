import { Component, HostListener, inject, input, Input, Signal } from '@angular/core';
import { LikeButtonComponent } from '../../components/like-button/like-button.component';
import { AlbumService } from '../../services/album/album.service';
import { AlbumOutputShow } from '../../entities/album';
import { TableResizeService } from '../../services/TableResize/table-resize.service';
import { ChangePlaylistPlayerComponent } from '../../components/change-playlist-player/change-playlist-player.component';
import { TitleSectionComponent } from '../../components/title-section/title-section.component';
import { AddToPlaylistComponent } from '../../components/add-to-playlist/add-to-playlist.component';

@Component({
    selector: 'app-album-show',
    standalone: true,
    imports: [LikeButtonComponent, ChangePlaylistPlayerComponent, TitleSectionComponent, AddToPlaylistComponent],
    templateUrl: './album-show.component.html',
    styleUrl: './album-show.component.css',
})
export class AlbumShowComponent {
    slug: Signal<string> = input.required();

    private readonly albumService: AlbumService = inject(AlbumService);
    private readonly tableResizeService: TableResizeService = inject(TableResizeService);

    album!: AlbumOutputShow;

    @HostListener('window:resize')
    onResize() {
        this.tableResizeService.updateDisplay();
    }
    async ngOnInit(): Promise<void> {
        this.tableResizeService.updateDisplay();
        this.album = await this.albumService.show(this.slug());
        setTimeout(() => {
            this.tableResizeService.updateDisplay();
        }, 0);
    }
}
