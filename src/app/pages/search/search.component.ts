import { Component, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { LikeableItemService } from '../../services/likeable-item/likeable-item.service';
import { MapLikeableItem } from '../../entities/response';
import { AddToPlaylistComponent } from '../../components/add-to-playlist/add-to-playlist.component';
import { ChangePlaylistPlayerComponent } from '../../components/change-playlist-player/change-playlist-player.component';
import { LinkShowComponent } from '../../components/link-show/link-show.component';
import { UploadService } from '../../services/upload/upload.service';
import { ListArtistsComponent } from '../../components/list-artists/list-artists.component';
import { LikeButtonComponent } from '../../components/like-button/like-button.component';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [
        AddToPlaylistComponent,
        ChangePlaylistPlayerComponent,
        LinkShowComponent,
        ListArtistsComponent,
        LikeButtonComponent,
    ],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
})
export class SearchComponent {
    @Input() search?: string;

    private readonly likeableItemService: LikeableItemService = inject(LikeableItemService);
    readonly uploadService: UploadService = inject(UploadService);

    result!: MapLikeableItem;

    async ngOnChanges(): Promise<void> {
        this.result = await this.likeableItemService.search(this.search || '');
        console.log(this.result.playlists);
        console.log(this.result.songs);
        console.log(this.result.albums);
    }
}
