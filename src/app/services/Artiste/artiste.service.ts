import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AlbumOutputShow } from '../../entities/album';
import { CustomResponse } from '../../entities/response';
import { ArtistOutputShow } from '../../entities/artist';

@Injectable({
    providedIn: 'root',
})
export class ArtisteService {
    private readonly httpClient: HttpClient = inject(HttpClient);
    private readonly apiUrl: string = environment.API_URL;
    private readonly resource: string = 'artist';

    async show(slug: string): Promise<ArtistOutputShow> {
        const http$: Observable<CustomResponse<ArtistOutputShow>> = this.httpClient.get<
            CustomResponse<ArtistOutputShow>
        >(`${this.apiUrl}/${this.resource}/${slug}`);
        return lastValueFrom(http$).then((res) => {
            console.log(res);
            return res.body;
        });
    }
}
