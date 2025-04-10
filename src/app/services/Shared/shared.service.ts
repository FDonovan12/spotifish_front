import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { SharedInput, SharedOutputBase } from '../../entities/shared';
import { Observable, lastValueFrom } from 'rxjs';
import { CustomResponse } from '../../entities/response';
import { PlaylistOutputBase } from '../../entities/playlist';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    private readonly httpClient: HttpClient = inject(HttpClient);
    private readonly apiUrl: string = environment.API_URL;
    private readonly resource: string = 'shared';

    async create(sharedInput: SharedInput): Promise<SharedOutputBase> {
        const http$: Observable<CustomResponse<SharedOutputBase>> = this.httpClient.post<
            CustomResponse<SharedOutputBase>
        >(`${this.apiUrl}/${this.resource}/new`, sharedInput);
        return lastValueFrom(http$).then((res) => res.body);
    }

    async addContributor(slug: string): Promise<PlaylistOutputBase> {
        const http$: Observable<CustomResponse<PlaylistOutputBase>> = this.httpClient.get<
            CustomResponse<PlaylistOutputBase>
        >(`${this.apiUrl}/${this.resource}/${slug}`);
        return lastValueFrom(http$).then((res) => res.body);
    }
}
