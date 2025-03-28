import { Component, effect, ElementRef, inject, Input, signal, Signal, WritableSignal } from '@angular/core';
import { PlaylistOutputBase } from '../../entities/playlist';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { SongOutputBase } from '../../entities/song';
import { SongPlaylistService } from '../../services/SongPlaylist/song-playlist.service';
import { SongPlaylistInput } from '../../entities/song-playlist';
import { StockContentService } from '../../services/StockContent/stock-content.service';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-add-to-playlist',
    standalone: true,
    imports: [NgStyle],
    templateUrl: './add-to-playlist.component.html',
    styleUrl: './add-to-playlist.component.css',
})
export class AddToPlaylistComponent {
    @Input({ required: true }) song!: SongOutputBase;

    playlists!: Signal<PlaylistOutputBase[]>;

    isVisible: WritableSignal<boolean> = signal(false);
    positionStyle: any;

    private readonly playlistService: PlaylistService = inject(PlaylistService);
    private readonly songPlaylistService: SongPlaylistService = inject(SongPlaylistService);
    private readonly stockContentService: StockContentService = inject(StockContentService);
    private elementRef = inject(ElementRef);

    ngOnInit(): void {
        this.playlists = this.stockContentService.getPlaylistsSignal;
    }

    private clickListener = (event: Event) => {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.isVisible.set(false);
        }
    };
    constructor() {
        effect(() => {
            if (this.isVisible()) {
                document.addEventListener('click', this.clickListener);
            } else {
                document.removeEventListener('click', this.clickListener);
            }
        });
    }
    ngOnDestroy() {
        document.removeEventListener('click', this.clickListener);
    }

    addToPlaylist(song: SongOutputBase, playlist: PlaylistOutputBase) {
        const songPlaylistInput: SongPlaylistInput = { songSlug: song.slug, playlistSlug: playlist.slug };
        this.songPlaylistService.new(songPlaylistInput);
        this.isVisible.set(false);
    }

    openMenu(event: MouseEvent) {
        this.setPosition(event.clientX, event.clientY);
        this.isVisible.set(true);
    }
    setPosition(x: number, y: number) {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        let test: object;
        if (2 * x > screenWidth) {
            this.positionStyle = { ...this.positionStyle, 'right.px': screenWidth - x };
        } else {
            this.positionStyle = { ...this.positionStyle, 'left.px': x };
        }

        if (2 * y > screenHeight) {
            this.positionStyle = { ...this.positionStyle, 'bottom.px': screenHeight - y };
        } else {
            this.positionStyle = { ...this.positionStyle, 'top.px': y };
        }
    }
}
