import { NgStyle } from '@angular/common';
import {
    Component,
    effect,
    ElementRef,
    inject,
    input,
    InputSignal,
    output,
    signal,
    Signal,
    WritableSignal,
} from '@angular/core';
import { PlaylistOutputBase } from '../../../entities/playlist';
import { SongOutputBase } from '../../../entities/song';
import { SongPlaylistInput, SongPlaylistOutputBase } from '../../../entities/song-playlist';
import { SongPlaylistService } from '../../../repositories/song-playlist/song-playlist.service';
import { StockContentService } from '../../../services/stock-content/stock-content.service';

@Component({
    selector: 'app-add-to-playlist',
    imports: [NgStyle],
    templateUrl: './add-to-playlist.component.html',
    styleUrl: './add-to-playlist.component.css',
})
export class AddToPlaylistComponent {
    readonly removeSongPlaylist = output<SongPlaylistOutputBase>();
    song: InputSignal<SongOutputBase> = input.required<SongOutputBase>();
    songPlaylist: InputSignal<SongPlaylistOutputBase | null> = input<SongPlaylistOutputBase | null>(null);

    playlists!: Signal<PlaylistOutputBase[]>;

    isVisible: WritableSignal<boolean> = signal(false);
    positionStyle: any;

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
    removeFromPlaylist(songPlaylist: SongPlaylistOutputBase | null) {
        if (!songPlaylist) return;
        this.songPlaylistService.delete(songPlaylist);
        this.removeSongPlaylist.emit(songPlaylist);
        this.isVisible.set(false);
    }

    openMenu(event: MouseEvent) {
        this.setPosition(event.clientX, event.clientY);
        this.isVisible.set(true);
    }
    setPosition(x: number, y: number) {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

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
