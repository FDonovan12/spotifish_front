import { Component, inject, Input } from '@angular/core';
import { LikeableItemService } from '../../services/likeable-item/likeable-item.service';
import { MapLikeableItem } from '../../entities/response';
import { PlayerService } from '../../services/player/player.service';
import { AlbumOutputList, AlbumOutputShow } from '../../entities/album';
import { SongOutputBase } from '../../entities/song';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
})
export class SearchComponent {
    @Input() search?: string;

    private readonly likeableItemService: LikeableItemService = inject(LikeableItemService);
    private readonly playerService: PlayerService = inject(PlayerService);

    result!: MapLikeableItem;

    async ngOnChanges(): Promise<void> {
        this.result = await this.likeableItemService.search(this.search || '');
    }

    changeMusic(album: AlbumOutputShow | AlbumOutputList) {
        this.playerService.fromAlbum(album);
    }
}
