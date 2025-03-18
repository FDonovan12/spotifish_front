import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CustomResponse } from '../../entities/response';
import { PlaylistOutputBase } from '../../entities/playlist';

@Injectable({
    providedIn: 'root',
})
export class PlaylistService {
    private readonly httpClient: HttpClient = inject(HttpClient);
    private readonly rootUrl: string = environment.API_URL;
    private readonly resource: string = 'playlist';

    async show(slug: string): Promise<PlaylistOutputBase> {
        const http$: Observable<CustomResponse<PlaylistOutputBase>> = this.httpClient.get<CustomResponse<PlaylistOutputBase>>(
            `${this.rootUrl}/${this.resource}/${slug}`
        );
        return lastValueFrom(http$).then((res) => res.body);
    }
}
