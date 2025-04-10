import { Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { LikeableItemOutputBase } from '../../entities/likeable-item';
import { LikeableItemService } from '../../services/likeable-item/likeable-item.service';
import { PopupService } from '../../services/popup/popup.service';
import { LinkShowComponent } from '../../components/link-show/link-show.component';
import { ChangePlaylistPlayerComponent } from '../../components/change-playlist-player/change-playlist-player.component';
import { UploadService } from '../../services/upload/upload.service';

@Component({
    selector: 'app-liked-library',
    standalone: true,
    imports: [LinkShowComponent, ChangePlaylistPlayerComponent],
    templateUrl: './liked-library.component.html',
    styleUrl: './liked-library.component.css',
})
export class LikedLibraryComponent {
    @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer!: ViewContainerRef;

    private readonly likeableItemService: LikeableItemService = inject(LikeableItemService);
    readonly uploadService: UploadService = inject(UploadService);
    private readonly popupService: PopupService = inject(PopupService);

    numberOfLikedSong!: number;
    likeableItems!: LikeableItemOutputBase[];

    async ngOnInit(): Promise<void> {
        this.likeableItems = await this.likeableItemService.me();
        this.numberOfLikedSong = await this.likeableItemService.meSongNumber();
    }

    ngAfterViewInit() {
        this.popupService.setViewContainerRef(this.popupContainer);
    }

    openCreatePlaylist() {
        this.popupService.openPlaylistCreate();
    }
}
