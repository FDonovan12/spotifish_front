import { Component, inject, Input } from '@angular/core';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { PlaylistOutputBase } from '../../entities/playlist';

@Component({
    selector: 'app-playlist-show',
    standalone: true,
    imports: [],
    templateUrl: './playlist-show.component.html',
    styleUrl: './playlist-show.component.css',
})
export class PlaylistShowComponent {
    @Input() slug?: string;

    private readonly playlistService: PlaylistService = inject(PlaylistService);

    playlist?: PlaylistOutputBase;

    async ngOnInit(): Promise<void> {
        this.playlist = await this.playlistService.show(this.slug || '');
        console.log(this.playlist);
    }
}
