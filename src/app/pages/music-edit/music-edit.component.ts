import { Component, inject, Input } from '@angular/core';
import { MusicService } from '../../services/music/music.service';
import { MusicFormComponent } from '../../components/music-form/music-form.component';
import { NgIf } from '@angular/common';
import { SongBase } from '../../entities/song';

@Component({
    selector: 'app-music-edit',
    standalone: true,
    imports: [MusicFormComponent, NgIf],
    templateUrl: './music-edit.component.html',
    styleUrl: './music-edit.component.css',
})
export class MusicEditComponent {
    @Input() slug?: string;
    private readonly musicService: MusicService = inject(MusicService);

    music?: SongBase;

    async ngOnInit(): Promise<void> {
        this.music = await this.musicService.show(this.slug || '');
    }
    onMusicSubmitted(music: SongBase) {
        throw new Error('Method not implemented.');
    }
}
