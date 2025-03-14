import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicListOutput } from '../../entities/music';
import { MusicService } from '../../services/music/music.service';
import { Body } from '../../entities/response';

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

    music: Body<MusicListOutput> | undefined;

    async ngOnInit(): Promise<void> {
        this.music = await this.musicService.show(this.slug || '');
    }
}
