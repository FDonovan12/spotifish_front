import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { SongOutputBase } from '../../entities/song';
import { PlaylistOutputBase } from '../../entities/playlist';
import { AlbumOutputBase, AlbumOutputList, AlbumOutputShow } from '../../entities/album';
import { ArtistOutputBase, ArtistOutputShow } from '../../entities/artist';
import { AlbumService } from '../album/album.service';
import { PlaylistService } from '../playlist/playlist.service';

@Injectable({
    providedIn: 'root',
})
export class PlayerService {
    private currentSong: WritableSignal<SongOutputBase | null> = signal<SongOutputBase | null>(null);
    private currentListenList: WritableSignal<SongOutputBase[]> = signal<SongOutputBase[]>([]);
    private currentNumber: WritableSignal<number> = signal(0);

    private readonly albumService: AlbumService = inject(AlbumService);
    private readonly playlistService: PlaylistService = inject(PlaylistService);

    public get getSong() {
        return this.currentSong;
    }

    private setSong(song: SongOutputBase) {
        this.currentSong.set(song);
    }

    private fromNumber() {
        this.setSong(this.currentListenList()[this.currentNumber()]);
    }

    public setList(list: SongOutputBase[]) {
        this.currentListenList.set(list);
    }

    private fromList(songs: SongOutputBase[]) {
        this.setList(songs);
        this.currentNumber.set(0);
        this.fromNumber();
    }

    public async fromPlaylist(playlistbase: PlaylistOutputBase) {
        const playlist: PlaylistOutputBase = await this.playlistService.show(playlistbase.slug);
        const songs = playlist.songPlaylists.map((songPlaylist) => songPlaylist.song);
        this.fromList(songs);
    }

    public async fromAlbum(albumBase: AlbumOutputBase) {
        const album: AlbumOutputShow = await this.albumService.show(albumBase.slug);
        const songs = album.songAlbums.map((songAlbum) => songAlbum.song);
        this.fromList(songs);
    }

    public increment() {
        this.currentNumber.update((value) => (value + 1) % this.currentListenList().length);
        this.fromNumber();
    }

    public decrement() {
        this.currentNumber.update((value) => (value || this.currentListenList().length) - 1);
        this.fromNumber();
    }

    // public fromArtist(artistbase: ArtistOutputBase) {
    //     const album: AlbumOutputShow = await this.art.show(albumBase.slug);
    //     const songs = album.songAlbums.map((songAlbum) => songAlbum.song);
    //     this.setList(songs);
    //     this.setSong(songs[0]);
    //     this.currentNumber.set(0);
    // }
}
