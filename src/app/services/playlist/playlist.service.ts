import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CustomResponse } from '../../entities/response';
import { PlaylistBase, PlaylistOutputBase } from '../../entities/playlist';

@Injectable({
    providedIn: 'root',
})
export class PlaylistService {
    private readonly httpClient: HttpClient = inject(HttpClient);
    private readonly apiUrl: string = environment.API_URL;
    private readonly resource: string = 'playlist';

    async show(slug: string): Promise<PlaylistOutputBase> {
        const http$: Observable<CustomResponse<PlaylistOutputBase>> = this.httpClient.get<
            CustomResponse<PlaylistOutputBase>
        >(`${this.apiUrl}/${this.resource}/${slug}`);
        return lastValueFrom(http$).then((res) => res.body);
    }

    async me(): Promise<PlaylistOutputBase[]> {
        const http$: Observable<CustomResponse<PlaylistOutputBase[]>> = this.httpClient.get<
            CustomResponse<PlaylistOutputBase[]>
        >(`${this.apiUrl}/${this.resource}/mine/me`);
        return lastValueFrom(http$).then((res) => res.body);
    }

    async new(playlistInput: PlaylistBase): Promise<PlaylistOutputBase> {
        console.log(playlistInput);
        const http$: Observable<CustomResponse<PlaylistOutputBase>> = this.httpClient.post<
            CustomResponse<PlaylistOutputBase>
        >(`${this.apiUrl}/${this.resource}/new`, playlistInput);
        return lastValueFrom(http$).then((res) => res.body);
    }
}
