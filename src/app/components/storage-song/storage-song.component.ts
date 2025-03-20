import { Component, inject, Input } from '@angular/core';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { DatePipe } from '@angular/common';
import { SongBase } from '../../entities/song';
import { PlaylistOutputBase } from '../../entities/playlist';
import { AlbumOutputShow } from '../../entities/album';

@Component({
    selector: 'app-storage-song',
    standalone: true,
    imports: [DatePipe],
    templateUrl: './storage-song.component.html',
    styleUrl: './storage-song.component.css',
})
export class StorageSongComponent {
    @Input() storageSong?: PlaylistOutputBase | AlbumOutputShow;

    private readonly playlistService: PlaylistService = inject(PlaylistService);

    async ngOnInit(): Promise<void> {
        this.storageSong = await this.playlistService.show('90791c09-92d8-4411-99db-651b3a411cf7');
    }

    getPrincipalArtist(song: SongBase) {
        return song.songArtists.filter((songartist) => songartist.isPrincipalArtist)[0]?.artist.name || '';
    }
}
