import { Component, HostListener, inject, input, InputSignal } from '@angular/core';
import { PlaylistOutputBase } from '../../entities/playlist';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { TableResizeService } from '../../services/TableResize/table-resize.service';
import { LikeableItemService } from '../../services/likeable-item/likeable-item.service';
import { SongOutputBase } from '../../entities/song';
import { ListArtistsComponent } from '../../components/list-artists/list-artists.component';
import { LikeButtonComponent } from '../../components/like-button/like-button.component';
import { AddToPlaylistComponent } from '../../components/add-to-playlist/add-to-playlist.component';

@Component({
    selector: 'app-songs-liked',
    imports: [ListArtistsComponent, LikeButtonComponent, AddToPlaylistComponent],
    templateUrl: './songs-liked.component.html',
    styleUrl: './songs-liked.component.css',
})
export class SongsLikedComponent {
    private readonly likeableItemService: LikeableItemService = inject(LikeableItemService);

    songs!: SongOutputBase[];

    async ngOnInit(): Promise<void> {
        this.songs = await this.likeableItemService.meSong();
    }
}
