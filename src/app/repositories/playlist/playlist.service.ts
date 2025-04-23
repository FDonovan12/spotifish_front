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

    async mine(): Promise<PlaylistOutputBase[]> {
        const http$: Observable<CustomResponse<PlaylistOutputBase[]>> = this.httpClient.get<
            CustomResponse<PlaylistOutputBase[]>
        >(`${this.apiUrl}/${this.resource}/show/mine`);
        return lastValueFrom(http$).then((res) => res.body);
    }

    async new(playlistInput: PlaylistBase): Promise<PlaylistOutputBase> {
        const http$: Observable<CustomResponse<PlaylistOutputBase>> = this.httpClient.post<
            CustomResponse<PlaylistOutputBase>
        >(`${this.apiUrl}/${this.resource}/new`, playlistInput);
        return lastValueFrom(http$).then((res) => res.body);
    }

    async edit(playlistInput: PlaylistBase, slug: string): Promise<PlaylistOutputBase> {
        const http$: Observable<CustomResponse<PlaylistOutputBase>> = this.httpClient.put<
            CustomResponse<PlaylistOutputBase>
        >(`${this.apiUrl}/${this.resource}/edit/${slug}`, playlistInput);
        return lastValueFrom(http$).then((res) => res.body);
    }

    async delete(idEntity: string): Promise<boolean> {
        const http$: Observable<CustomResponse<boolean>> = this.httpClient.delete<CustomResponse<boolean>>(
            `${this.apiUrl}/${this.resource}/delete/${idEntity}`
        );
        return lastValueFrom(http$).then((res) => res.body);
    }
}
