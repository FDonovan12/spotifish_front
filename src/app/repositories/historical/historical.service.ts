import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { SongOutputBase } from '../../entities/song';
import { CustomResponse } from '../../entities/response';
import { HistoricalInput } from '../../entities/historical';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HistoricalService {
    private readonly httpClient: HttpClient = inject(HttpClient);
    private readonly apiUrl: string = environment.API_URL;
    private readonly resource: string = 'historical';

    async new(historicalInput: HistoricalInput): Promise<boolean> {
        const http$: Observable<CustomResponse<boolean>> = this.httpClient.post<CustomResponse<boolean>>(
            `${this.apiUrl}/${this.resource}/new`,
            historicalInput
        );
        return lastValueFrom(http$).then();
    }
}
