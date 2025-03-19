import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CustomResponse } from '../../entities/response';

@Injectable({
    providedIn: 'root',
})
export class UserLikeableItemService {
    private readonly httpClient: HttpClient = inject(HttpClient);
    private readonly rootUrl: string = environment.API_URL;
    private readonly resource: string = 'userlikeableitem';

    async like(slug: string): Promise<boolean> {
        const http$: Observable<CustomResponse<boolean>> = this.httpClient.post<CustomResponse<boolean>>(
            `${this.rootUrl}/${this.resource}/new/${slug}`,
            {}
        );
        return lastValueFrom(http$).then((res) => res.body);
    }

    async dislike(slug: string): Promise<boolean> {
        const http$: Observable<CustomResponse<boolean>> = this.httpClient.delete<CustomResponse<boolean>>(
            `${this.rootUrl}/${this.resource}/delete/${slug}`
        );
        return lastValueFrom(http$).then((res) => res.body);
    }
}
