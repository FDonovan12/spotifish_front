import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CustomResponse } from '../../entities/response';
import { SongPlaylistBase, SongPlaylistInput, SongPlaylistOutputBase } from '../../entities/song-playlist';

@Injectable({
    providedIn: 'root',
})
export class SongPlaylistService {
    private readonly httpClient: HttpClient = inject(HttpClient);
    private readonly apiUrl: string = environment.API_URL;
    private readonly resource: string = 'song-playlist';

    async new(songPlaylistInput: SongPlaylistInput): Promise<SongPlaylistBase> {
        const http$: Observable<CustomResponse<SongPlaylistBase>> = this.httpClient.post<
            CustomResponse<SongPlaylistBase>
        >(`${this.apiUrl}/${this.resource}/new`, songPlaylistInput);
        return lastValueFrom(http$).then((res) => res.body);
    }

    async delete(songPlaylist: SongPlaylistOutputBase): Promise<boolean> {
        const http$: Observable<CustomResponse<boolean>> = this.httpClient.delete<CustomResponse<boolean>>(
            `${this.apiUrl}/${this.resource}/delete/${songPlaylist.permission.idEntity}`
        );
        return lastValueFrom(http$).then((res) => res.body);
    }
}
