import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Injectable, Signal } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { PlaylistBase, PlaylistOutputBase } from '../../entities/playlist';
import { CustomResponse } from '../../entities/response';

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

    test(): Signal<PlaylistOutputBase[] | undefined> {
        const response = httpResource<CustomResponse<PlaylistOutputBase[]>>(
            `${this.apiUrl}/${this.resource}/show/mine`
        );
        return computed(() => response.value()?.body);
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
