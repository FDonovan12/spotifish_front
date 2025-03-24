import { Component, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { LikeableItemService } from '../../services/likeable-item/likeable-item.service';
import { MapLikeableItem } from '../../entities/response';
import { PlayerService } from '../../services/player/player.service';
import { AlbumOutputList, AlbumOutputShow } from '../../entities/album';
import { PopupService } from '../../services/popup/popup.service';
import { AddToPlaylistComponent } from '../../components/add-to-playlist/add-to-playlist.component';
import { PlaylistOutputBase } from '../../entities/playlist';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [AddToPlaylistComponent],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
})
export class SearchComponent {
    @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer!: ViewContainerRef;
    @Input() search?: string;

    private readonly likeableItemService: LikeableItemService = inject(LikeableItemService);
    readonly playerService: PlayerService = inject(PlayerService);

    result!: MapLikeableItem;

    async ngOnChanges(): Promise<void> {
        this.result = await this.likeableItemService.search(this.search || '');
    }

    changeMusicFromAlbum(album: AlbumOutputShow | AlbumOutputList) {
        this.playerService.fromAlbum(album);
    }

    changeMusicFromPlaylist(playlist: PlaylistOutputBase) {
        this.playerService.fromPlaylist(playlist);
    }

    addToPlaylist() {}
}
