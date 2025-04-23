import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { PlaylistOutputBase } from '../../entities/playlist';
import { PlaylistService } from '../../repositories/playlist/playlist.service';

@Injectable({
    providedIn: 'root',
})
export class StockContentService {
    private playlists: WritableSignal<PlaylistOutputBase[]> = signal<PlaylistOutputBase[]>([]);
    private _dateStock: Date = new Date(0);

    private readonly playlistService: PlaylistService = inject(PlaylistService);

    public get getPlaylistsSignal(): Signal<PlaylistOutputBase[]> {
        const dateStockIsOld = Date.now() - this._dateStock.getTime() > 1000 * 15; //15 seconds
        if (dateStockIsOld) {
            this._dateStock = new Date();
            this.playlistService.mine().then((res) => this.playlists.set(res));
        }
        return this.playlists;
    }
}
