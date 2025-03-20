import { Component, inject } from '@angular/core';
import { LikeableItemService } from '../../services/likeable-item/likeable-item.service';
import { LikeableItemBase, LikeableItemOutputBase } from '../../entities/likeable-item';

@Component({
    selector: 'app-liked-library',
    standalone: true,
    imports: [],
    templateUrl: './liked-library.component.html',
    styleUrl: './liked-library.component.css',
})
export class LikedLibraryComponent {
    private readonly likeableItemService: LikeableItemService = inject(LikeableItemService);

    numberOfLikedSong!: number;
    likeableItems!: LikeableItemOutputBase[];

    async ngOnInit(): Promise<void> {
        this.likeableItems = await this.likeableItemService.me();
        this.numberOfLikedSong = await this.likeableItemService.meSongNumber();
    }
}
