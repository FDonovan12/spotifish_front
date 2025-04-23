import {
    Component,
    computed,
    inject,
    input,
    Input,
    InputSignal,
    Signal,
    signal,
    SimpleChanges,
    WritableSignal,
} from '@angular/core';
import { UserLikeableItemService } from '../../../services/user-likeable-item/user-likeable-item.service';
import { LikeableItemOutputBase } from '../../../entities/likeable-item';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as fullHeart, faHeartBroken, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-like-button',
    imports: [FontAwesomeModule],
    templateUrl: './like-button.component.html',
    styleUrl: './like-button.component.css',
})
export class LikeButtonComponent {
    likeableItem: InputSignal<LikeableItemOutputBase> = input.required<LikeableItemOutputBase>();

    isHovering: WritableSignal<boolean> = signal(false);
    isLiked: WritableSignal<boolean> = signal(false);

    ngOnInit(): void {
        this.isLiked.set(this.likeableItem().isLiked.liked || false);
    }

    icon: Signal<IconDefinition> = computed(() => {
        if (this.isLiked()) {
            return this.isHovering() ? faHeartBroken : fullHeart;
        }
        return this.isHovering() ? fullHeart : emptyHeart;
    });

    private readonly userLikeableItemService: UserLikeableItemService = inject(UserLikeableItemService);

    async interact(slug: string) {
        let result: boolean = false;
        if (this.isLiked()) {
            result = await this.dislike(slug);
        } else {
            result = await this.like(slug);
        }
        if (result) {
            this.isLiked.update((bool) => !bool);
        }
    }

    async like(slug: string): Promise<boolean> {
        return await this.userLikeableItemService.like(slug);
    }

    async dislike(slug: string): Promise<boolean> {
        return await this.userLikeableItemService.dislike(slug);
    }

    over(): void {
        this.isHovering.set(true);
    }

    leave(): void {
        this.isHovering.set(false);
    }
}
