import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CustomResponse } from '../../entities/response';
import { SongOutputBase } from '../../entities/song';

@Injectable({
    providedIn: 'root',
})
export class UploadService {
    private readonly httpClient: HttpClient = inject(HttpClient);
    private readonly apiUrl: string = environment.API_URL;
    private readonly rootUrl: string = environment.ROOT_URL;
    private readonly resource: string = 'upload';

    async song(file: File, slug: string): Promise<SongOutputBase> {
        const formData = new FormData();
        formData.append('file', file);
        const http$: Observable<CustomResponse<SongOutputBase>> = this.httpClient.post<CustomResponse<SongOutputBase>>(
            `${this.apiUrl}/${this.resource}/song/${slug}`,
            formData
        );
        return lastValueFrom(http$).then((res) => res.body);
    }

    getFileUrl(path: string) {
        return `${this.rootUrl}/${path}`;
    }
}
