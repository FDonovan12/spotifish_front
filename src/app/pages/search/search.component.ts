import { Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { LikeableItemService } from '../../services/likeable-item/likeable-item.service';
import { MapLikeableItem } from '../../entities/response';

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

    result!: MapLikeableItem;

    async ngOnChanges(): Promise<void> {
        this.result = await this.likeableItemService.search(this.search || '');
    }
}
