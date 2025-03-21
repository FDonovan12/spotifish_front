import { Component, computed, inject, input, Signal, WritableSignal } from '@angular/core';
import { SongOutputBase } from '../../entities/song';
import { PlayerService } from '../../services/player/player.service';
import { UploadService } from '../../services/upload/upload.service';

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

    song: WritableSignal<SongOutputBase | null> = this.playerService.getSong;
    // srcSong: string = this.uploadService.getFileUrl(this.song()?.path || '');
    srcSong: Signal<string> = computed(() => this.uploadService.getFileUrl(this.song()?.path || ''));

    public increment() {
        this.playerService.increment();
        console.log('this.srcsong : ', this.srcSong());
    }

    public decrement() {
        this.playerService.decrement();
        console.log('this.srcsong : ', this.srcSong());
    }
}
