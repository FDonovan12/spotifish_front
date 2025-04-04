import { Component, inject, input, Input, Signal } from '@angular/core';
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
    slug: Signal<string> = input.required();

    private readonly musicService: MusicService = inject(MusicService);

    music!: SongBase;

    async ngOnInit(): Promise<void> {
        this.music = await this.musicService.show(this.slug());
    }
    onMusicSubmitted(music: SongBase) {
        this.musicService.update(music, this.slug());
    }
}
