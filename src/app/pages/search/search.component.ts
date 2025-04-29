import { Component, inject, input, Input, InputSignal, ViewChild, ViewContainerRef } from '@angular/core';
import { LikeableItemService } from '../../repositories/likeable-item/likeable-item.service';
import { MapLikeableItem } from '../../entities/response';



import { UploadService } from '../../services/upload/upload.service';


import { CardLikeableItemComponent } from '../../components/molecules/card-likeable-item/card-likeable-item.component';

@Component({
    selector: 'app-search',
    imports: [
    CardLikeableItemComponent
],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
})
export class SearchComponent {
    search: InputSignal<string> = input.required<string>();

    private readonly likeableItemService: LikeableItemService = inject(LikeableItemService);
    readonly uploadService: UploadService = inject(UploadService);

    result!: MapLikeableItem;

    async ngOnChanges(): Promise<void> {
        this.result = await this.likeableItemService.search(this.search());
    }
}
