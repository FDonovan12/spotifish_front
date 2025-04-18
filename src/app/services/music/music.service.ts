import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom, Observable } from 'rxjs';
import { CustomResponse, CustomListResponse } from '../../entities/response';
import { SongBase, SongOutputBase } from '../../entities/song';

@Injectable({
    providedIn: 'root',
})
export class MusicService {
    private readonly httpClient: HttpClient = inject(HttpClient);
    private readonly apiUrl: string = environment.API_URL;
    private readonly resource: string = 'song';

    async list(): Promise<SongOutputBase[]> {
        const http$: Observable<CustomListResponse<SongOutputBase>> = this.httpClient.get<
            CustomListResponse<SongOutputBase>
        >(`${this.apiUrl}/${this.resource}`);
        return lastValueFrom(http$).then((res) => res.body);
    }

    async show(slug: string): Promise<SongBase> {
        const http$: Observable<CustomResponse<SongBase>> = this.httpClient.get<CustomResponse<SongBase>>(
            `${this.apiUrl}/${this.resource}/${slug}`
        );
        return lastValueFrom(http$).then((res) => res.body);
    }

    async create(music: SongBase): Promise<SongOutputBase> {
        const http$: Observable<CustomResponse<SongOutputBase>> = this.httpClient.post<CustomResponse<SongOutputBase>>(
            `${this.apiUrl}/${this.resource}/new`,
            music
        );
        return lastValueFrom(http$).then((res) => res.body);
    }

    async update(music: SongBase, slug: string): Promise<SongOutputBase> {
        const http$: Observable<CustomResponse<SongOutputBase>> = this.httpClient.put<CustomResponse<SongOutputBase>>(
            `${this.apiUrl}/${this.resource}/edit/${slug}`,
            music
        );
        return lastValueFrom(http$).then((res) => res.body);
    }

    async delete(id: number): Promise<boolean> {
        const http$: Observable<boolean> = this.httpClient.delete<boolean>(`${this.apiUrl}/${this.resource}/${id}`);
        return lastValueFrom(http$);
    }
}
