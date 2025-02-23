import { Component, inject, OnInit } from '@angular/core';
import { MusicService } from '../../services/music/music.service';
import { RouterLink } from '@angular/router';
import { MusicListOutput } from '../../entities/music';

@Component({
    selector: 'app-music-list',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './music-list.component.html',
    styleUrl: './music-list.component.css',
})
export class MusicListComponent implements OnInit {
    private readonly musicService: MusicService = inject(MusicService);

    musics!: MusicListOutput[];

    ngOnInit(): void {
        this.musicService.list().then((res) => (this.musics = res));
    }
}
