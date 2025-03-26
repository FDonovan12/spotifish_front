import { Component, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { LikeableItemService } from '../../services/likeable-item/likeable-item.service';
import { MapLikeableItem } from '../../entities/response';
import { AddToPlaylistComponent } from '../../components/add-to-playlist/add-to-playlist.component';
import { ChangePlaylistPlayerComponent } from '../../components/change-playlist-player/change-playlist-player.component';
import { LinkShowComponent } from '../../components/link-show/link-show.component';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [AddToPlaylistComponent, ChangePlaylistPlayerComponent, LinkShowComponent],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
})
export class SearchComponent {
    @Input() search?: string;

    private readonly likeableItemService: LikeableItemService = inject(LikeableItemService);

    result!: MapLikeableItem;

    async ngOnChanges(): Promise<void> {
        this.result = await this.likeableItemService.search(this.search || '');
    }
}
