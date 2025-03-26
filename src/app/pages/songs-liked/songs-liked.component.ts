import { Component } from '@angular/core';

@Component({
    selector: 'app-songs-liked',
    standalone: true,
    imports: [],
    templateUrl: './songs-liked.component.html',
    styleUrl: './songs-liked.component.css',
})
export class SongsLikedComponent {
    // @Input() slug?: string;
    // private readonly playlistService: PlaylistService = inject(PlaylistService);
    // playlist?: PlaylistOutputBase;
    // async ngOnInit(): Promise<void> {
    //     this.playlist = await this.playlistService.show(this.slug || '');
    // }
}
