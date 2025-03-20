import { Component, inject, input, Input, InputSignal } from '@angular/core';
import { UserLikeableItemService } from '../../services/user-likeable-item-service/user-likeable-item.service';
import { LikeableItemOutputBase } from '../../entities/likeable-item';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as fullHeart, faHeartBroken, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-like-button',
    standalone: true,
    imports: [FontAwesomeModule],
    templateUrl: './like-button.component.html',
    styleUrl: './like-button.component.css',
})
export class LikeButtonComponent {
    likeableItem: InputSignal<LikeableItemOutputBase> = input.required<LikeableItemOutputBase>();

    isHovering: boolean = false;

    private readonly userLikeableItemService: UserLikeableItemService = inject(UserLikeableItemService);

    async interact(slug: string) {
        let result: boolean = false;
        if (this.likeableItem().isLiked.liked) {
            result = await this.dislike(slug);
        } else {
            result = await this.like(slug);
        }
        if (result) {
            this.likeableItem().isLiked.liked = !this.likeableItem().isLiked.liked;
        }
    }

    async like(slug: string): Promise<boolean> {
        return await this.userLikeableItemService.like(slug);
    }

    async dislike(slug: string): Promise<boolean> {
        return await this.userLikeableItemService.dislike(slug);
    }

    over(): void {
        this.isHovering = true;
    }

    leave(): void {
        this.isHovering = false;
    }

    getIcon(): IconDefinition {
        if (this.likeableItem().isLiked.liked) {
            return this.isHovering ? faHeartBroken : fullHeart;
        }
        return this.isHovering ? fullHeart : emptyHeart;
    }
}
