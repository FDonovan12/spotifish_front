import { Component, computed, inject, input, Signal, WritableSignal } from '@angular/core';
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
    // srcSong: string = this.uploadService.getFileUrl(this.song()?.path || '');
    srcSong: Signal<string> = computed(() => this.uploadService.getFileUrl(this.song()?.path || ''));

    public increment() {
        this.playerService.increment();
    }

    public decrement() {
        this.playerService.decrement();
    }
    public addHistorical() {
        console.log('addHistorical');
        const historicalInput: HistoricalInput = {
            numberOflisten: 1,
            listenAt: new Date(),
            songSlug: this.song()?.slug || '',
            userSlug: this.authService.userSlug,
        };
        console.log(historicalInput);
        this.historicalService.new(historicalInput);
    }
}
