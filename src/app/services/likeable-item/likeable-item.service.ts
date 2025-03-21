import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom, Observable } from 'rxjs';
import { CustomResponse, CustomListResponse, MapLikeableItem } from '../../entities/response';
import { LikeableItemOutputBase } from '../../entities/likeable-item';

@Injectable({
    providedIn: 'root',
})
export class LikeableItemService {
    private readonly httpClient: HttpClient = inject(HttpClient);
    private readonly apiUrl: string = environment.API_URL;
    private readonly resource: string = 'likeableitem';

    async me(): Promise<LikeableItemOutputBase[]> {
        const http$: Observable<CustomListResponse<LikeableItemOutputBase>> = this.httpClient.get<
            CustomListResponse<LikeableItemOutputBase>
        >(`${this.apiUrl}/${this.resource}/me`);
        return lastValueFrom(http$).then((res) => res.body);
    }

    async meSongNumber(): Promise<number> {
        const http$: Observable<CustomResponse<number>> = this.httpClient.get<CustomResponse<number>>(
            `${this.apiUrl}/${this.resource}/me/songs-number`
        );
        return lastValueFrom(http$).then((res) => res.body);
    }

    async search(search: string): Promise<MapLikeableItem> {
        const http$: Observable<CustomResponse<MapLikeableItem>> = this.httpClient.get<CustomResponse<MapLikeableItem>>(
            `${this.apiUrl}/${this.resource}/search/${search}`
        );
        return lastValueFrom(http$).then((res) => res.body);
    }
}
