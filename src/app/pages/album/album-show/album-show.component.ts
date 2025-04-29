import { Component, HostListener, inject, input, Input, Signal } from '@angular/core';
import { LikeButtonComponent } from '../../../components/molecules/like-button/like-button.component';
import { AlbumService } from '../../../repositories/album/album.service';
import { AlbumOutputShow } from '../../../entities/album';
import { TableResizeService } from '../../../services/table-resize/table-resize.service';

import { TitleSectionComponent } from '../../../components/organisms/title-section/title-section.component';
import { AddToPlaylistComponent } from '../../../components/molecules/add-to-playlist/add-to-playlist.component';

@Component({
    selector: 'app-album-show',
    imports: [LikeButtonComponent, TitleSectionComponent, AddToPlaylistComponent],
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
