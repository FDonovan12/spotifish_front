import { Component, inject, OnInit } from '@angular/core';
import { MusicService } from '../../services/music/music.service';
import { RouterLink } from '@angular/router';
import { SongBase, SongOutputBase } from '../../entities/song';
import { CardLikeableItemComponent } from '../../components/card-likeable-item/card-likeable-item.component';

@Component({
    selector: 'app-music-list',
    standalone: true,
    imports: [RouterLink, CardLikeableItemComponent],
    templateUrl: './music-list.component.html',
    styleUrl: './music-list.component.css',
})
export class MusicListComponent implements OnInit {
    private readonly musicService: MusicService = inject(MusicService);

    musics!: SongOutputBase[];

    ngOnInit(): void {
        this.musicService.list().then((res) => (this.musics = res));
    }
}
