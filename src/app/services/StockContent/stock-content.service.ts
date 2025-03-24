import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { PlaylistOutputBase } from '../../entities/playlist';
import { PlaylistService } from '../playlist/playlist.service';

@Injectable({
    providedIn: 'root',
})
export class StockContentService {
    private playlists: WritableSignal<PlaylistOutputBase[]> = signal<PlaylistOutputBase[]>([]);
    private _init = false;

    private readonly playlistService: PlaylistService = inject(PlaylistService);

    public get getPlaylistsSignal(): Signal<PlaylistOutputBase[]> {
        if (!this._init) {
            this._init = true;
            this.playlistService.me().then((res) => {
                this.playlists.set(res);
                console.log(res);
            });
        }
        return this.playlists;
    }
}
