import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom, Observable } from 'rxjs';
import { CustomResponse, CustomResponseList } from '../../entities/response';
import {
    MusicCreateInput,
    MusicEditInput,
    MusicListOutput,
    MusicShowOutput,
} from '../../entities/music';

@Injectable({
    providedIn: 'root',
})
export class MusicService {
    private readonly httpClient: HttpClient = inject(HttpClient);
    private readonly rootUrl: string = environment.API_URL;
    private readonly resource: string = 'song';

    async list(): Promise<MusicListOutput[]> {
        const http$: Observable<CustomResponseList<MusicListOutput>> =
            this.httpClient.get<CustomResponseList<MusicListOutput>>(
                `${this.rootUrl}/${this.resource}`
            );
        return lastValueFrom(http$).then((res) => res.value);
    }

    async show(slug: string): Promise<MusicShowOutput> {
        const http$: Observable<CustomResponse<MusicShowOutput>> =
            this.httpClient.get<CustomResponse<MusicShowOutput>>(
                `${this.rootUrl}/${this.resource}/${slug}`
            );
        return lastValueFrom(http$).then((res) => res.value);
    }

    async create(music: MusicCreateInput): Promise<MusicShowOutput> {
        const http$: Observable<CustomResponse<MusicShowOutput>> =
            this.httpClient.post<CustomResponse<MusicShowOutput>>(
                `${this.rootUrl}/${this.resource}/new`,
                music
            );
        return lastValueFrom(http$).then((res) => res.value);
    }

    async update(
        music: MusicEditInput,
        slug: string
    ): Promise<MusicShowOutput> {
        const http$: Observable<CustomResponse<MusicShowOutput>> =
            this.httpClient.put<CustomResponse<MusicShowOutput>>(
                `${this.rootUrl}/${this.resource}/edit/${slug}`,
                music
            );
        return lastValueFrom(http$).then((res) => res.value);
    }

    async delete(id: number): Promise<boolean> {
        const http$: Observable<boolean> = this.httpClient.delete<boolean>(
            `${this.rootUrl}/${this.resource}/${id}`
        );
        return lastValueFrom(http$);
    }
}
