import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { SongOutputBase } from '../../entities/song';
import { PlaylistOutputBase } from '../../entities/playlist';
import { AlbumOutputBase, AlbumOutputList, AlbumOutputShow } from '../../entities/album';
import { ArtistOutputBase, ArtistOutputShow } from '../../entities/artist';
import { AlbumService } from '../album/album.service';
import { PlaylistService } from '../playlist/playlist.service';
import { ArtisteService } from '../Artiste/artiste.service';
import { LikeableItemOutputBase } from '../../entities/likeable-item';
import { LikeableItemService } from '../likeable-item/likeable-item.service';
import { Type } from '../../entities/permission-entity';

@Injectable({
    providedIn: 'root',
})
export class PlayerService {
    private currentSong: WritableSignal<SongOutputBase | null> = signal<SongOutputBase | null>(null);
    private currentListenList: WritableSignal<SongOutputBase[]> = signal<SongOutputBase[]>([]);
    private currentNumber: WritableSignal<number> = signal(0);

    private readonly albumService: AlbumService = inject(AlbumService);
    private readonly playlistService: PlaylistService = inject(PlaylistService);
    private readonly artisteService: ArtisteService = inject(ArtisteService);
    private readonly likeableItemService: LikeableItemService = inject(LikeableItemService);

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
        const songs = playlist.songPlaylists
            .sort((sp1, sp2) => sp1.position - sp2.position)
            .map((songPlaylist) => songPlaylist.song);
        this.fromList(songs);
    }

    public async fromAlbum(albumBase: AlbumOutputBase) {
        const album: AlbumOutputShow = await this.albumService.show(albumBase.slug);
        const songs = album.songAlbums
            .sort((sa1, sa2) => sa1.position - sa2.position)
            .map((songAlbum) => songAlbum.song);
        this.fromList(songs);
    }

    public async fromArtist(artistbase: ArtistOutputBase) {
        const artist: ArtistOutputShow = await this.artisteService.show(artistbase.slug);
        const songs = artist.songArtists.map((songArtist) => songArtist.song);
        this.fromList(songs);
    }

    public async fromLikeableItem(likeableItemBase: LikeableItemOutputBase) {
        if (likeableItemBase.type === Type.album) return this.fromAlbum(likeableItemBase as AlbumOutputBase);
        if (likeableItemBase.type === Type.artist) return this.fromArtist(likeableItemBase as ArtistOutputBase);
        if (likeableItemBase.type === Type.playlist) return this.fromPlaylist(likeableItemBase as PlaylistOutputBase);
    }

    public async fromLikedSong() {
        return this.fromList(await this.likeableItemService.meSong());
    }

    public increment() {
        this.currentNumber.update((value) => (value + 1) % this.currentListenList().length);
        this.fromNumber();
    }

    public decrement() {
        this.currentNumber.update((value) => (value || this.currentListenList().length) - 1);
        this.fromNumber();
    }
}
