import { Component, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { LikeableItemService } from '../../services/likeable-item/likeable-item.service';
import { MapLikeableItem } from '../../entities/response';
import { PlayerService } from '../../services/player/player.service';
import { AlbumOutputList, AlbumOutputShow } from '../../entities/album';
import { PopupService } from '../../services/popup/popup.service';
import { AddToPlaylistComponent } from '../../components/add-to-playlist/add-to-playlist.component';
import { PlaylistOutputBase } from '../../entities/playlist';
import { ChangePlaylistPlayerComponent } from '../../components/change-playlist-player/change-playlist-player.component';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [AddToPlaylistComponent, ChangePlaylistPlayerComponent],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
})
export class SearchComponent {
    @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer!: ViewContainerRef;
    @Input() search?: string;

    private readonly likeableItemService: LikeableItemService = inject(LikeableItemService);

    result!: MapLikeableItem;

    async ngOnChanges(): Promise<void> {
        this.result = await this.likeableItemService.search(this.search || '');
    }
}
