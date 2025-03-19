import { Component, inject, input, Input } from '@angular/core';
import { UserLikeableItemService } from '../../services/user-likeable-item-service/user-likeable-item.service';
import { LikeableItemOutputBase } from '../../entities/likeable-item';

@Component({
    selector: 'app-like-button',
    standalone: true,
    imports: [],
    templateUrl: './like-button.component.html',
    styleUrl: './like-button.component.css',
})
export class LikeButtonComponent {
    likeableItem = input.required<LikeableItemOutputBase>();

    private readonly userLikeableItemService: UserLikeableItemService = inject(UserLikeableItemService);

    async like(slug: string) {
        const result: boolean = await this.userLikeableItemService.like(slug);
        if (result) {
            this.likeableItem().isLiked.liked = true;
        }
    }

    async dislike(slug: string) {
        const result: boolean = await this.userLikeableItemService.dislike(slug);
        if (result) {
            this.likeableItem().isLiked.liked = true;
        }
    }
}
