import { Component, inject, input, Input, Signal } from '@angular/core';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { PlaylistOutputBase } from '../../entities/playlist';
import { DatePipe } from '@angular/common';
import { LikeButtonComponent } from '../../components/like-button/like-button.component';

@Component({
    selector: 'app-playlist-show',
    standalone: true,
    imports: [DatePipe, LikeButtonComponent],
    templateUrl: './playlist-show.component.html',
    styleUrl: './playlist-show.component.css',
})
export class PlaylistShowComponent {
    slug: Signal<string> = input.required();

    private readonly playlistService: PlaylistService = inject(PlaylistService);

    playlist?: PlaylistOutputBase;

    async ngOnInit(): Promise<void> {
        this.playlist = await this.playlistService.show(this.slug());
    }
}
