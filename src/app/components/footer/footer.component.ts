import {
    Component,
    computed,
    ElementRef,
    inject,
    input,
    signal,
    Signal,
    ViewChild,
    WritableSignal,
} from '@angular/core';
import { SongOutputBase } from '../../entities/song';
import { PlayerService } from '../../services/player/player.service';
import { UploadService } from '../../services/upload/upload.service';
import { HistoricalService } from '../../services/Historical/historical.service';
import { HistoricalInput } from '../../entities/historical';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'footer[app-footer]',
    standalone: true,
    imports: [],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
})
export class FooterComponent {
    private readonly playerService: PlayerService = inject(PlayerService);
    private readonly uploadService: UploadService = inject(UploadService);
    private readonly historicalService: HistoricalService = inject(HistoricalService);
    private readonly authService: AuthService = inject(AuthService);

    song: WritableSignal<SongOutputBase | null> = this.playerService.getSong;
    srcSong: Signal<string> = computed(() => {
        return this.uploadService.getFileUrl(this.song()?.path || '');
    });
    isPlayed: WritableSignal<boolean> = signal(true);

    private audioElement!: HTMLAudioElement;

    ngAfterViewInit() {
        this.audioElement = document.getElementById('audioPlayer') as HTMLAudioElement;
    }

    public ended() {
        this.addHistorical();
        this.increment();
        this.play();
    }

    public increment() {
        this.playerService.increment();
    }

    public decrement() {
        this.playerService.decrement();
    }

    public addHistorical() {
        const historicalInput: HistoricalInput = {
            numberOflisten: 1,
            listenAt: new Date(),
            songSlug: this.song()?.slug || '',
            userSlug: this.authService.userSlug,
        };
        this.historicalService.new(historicalInput);
    }

    public play() {
        this.isPlayed.set(true);
        this.audioElement.play();
    }

    public pause() {
        this.isPlayed.set(false);
        this.audioElement.pause();
    }
}
