import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom, Observable } from 'rxjs';
import { CustomResponse, CustomListResponse } from '../../entities/response';
import { LikeableItemBase, LikeableItemOutputBase } from '../../entities/likeable-item';

@Injectable({
    providedIn: 'root',
})
export class LikedItemService {
    private readonly httpClient: HttpClient = inject(HttpClient);
    private readonly rootUrl: string = environment.API_URL;
    private readonly resource: string = 'likeableitem';

    async me(): Promise<LikeableItemOutputBase[]> {
        const http$: Observable<CustomListResponse<LikeableItemOutputBase>> = this.httpClient.get<CustomListResponse<LikeableItemOutputBase>>(
            `${this.rootUrl}/${this.resource}/me`
        );
        return lastValueFrom(http$).then((res) => res.body);
    }

    meSongNumber(): number | PromiseLike<number> {
        const http$: Observable<CustomResponse<number>> = this.httpClient.get<CustomResponse<number>>(`${this.rootUrl}/${this.resource}/me/songs-number`);
        return lastValueFrom(http$).then((res) => res.body);
    }
}
