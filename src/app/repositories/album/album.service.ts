import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CustomResponse } from '../../entities/response';
import { AlbumOutputShow } from '../../entities/album';

@Injectable({
    providedIn: 'root',
})
export class AlbumService {
    private readonly httpClient: HttpClient = inject(HttpClient);
    private readonly apiUrl: string = environment.API_URL;
    private readonly resource: string = 'album';

    async show(slug: string): Promise<AlbumOutputShow> {
        const http$: Observable<CustomResponse<AlbumOutputShow>> = this.httpClient.get<CustomResponse<AlbumOutputShow>>(
            `${this.apiUrl}/${this.resource}/${slug}`
        );
        return lastValueFrom(http$).then((res) => res.body);
    }
}
