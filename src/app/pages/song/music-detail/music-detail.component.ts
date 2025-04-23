import { Component, inject, input, Input, OnInit, Signal } from '@angular/core';
import { MusicService } from '../../../repositories/song/music.service';
import { SongBase } from '../../../entities/song';

@Component({
    selector: 'app-music-detail',
    imports: [],
    templateUrl: './music-detail.component.html',
    styleUrl: './music-detail.component.css',
})
export class MusicDetailComponent implements OnInit {
    slug: Signal<string> = input.required();

    private readonly musicService: MusicService = inject(MusicService);

    music: SongBase | undefined;

    async ngOnInit(): Promise<void> {
        this.music = await this.musicService.show(this.slug());
    }
}
