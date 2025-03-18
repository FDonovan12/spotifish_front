import { Component, inject, Input, OnInit } from '@angular/core';
import { MusicService } from '../../services/music/music.service';
import { SongBase } from '../../entities/song';

@Component({
    selector: 'app-music-detail',
    standalone: true,
    imports: [],
    templateUrl: './music-detail.component.html',
    styleUrl: './music-detail.component.css',
})
export class MusicDetailComponent implements OnInit {
    @Input() slug?: string;
    private readonly musicService: MusicService = inject(MusicService);

    music: SongBase | undefined;

    async ngOnInit(): Promise<void> {
        this.music = await this.musicService.show(this.slug || '');
    }
}
