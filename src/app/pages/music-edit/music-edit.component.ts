import { Component, inject, input, Input, Signal } from '@angular/core';
import { MusicService } from '../../services/music/music.service';
import { MusicFormComponent } from '../../components/music-form/music-form.component';
import { NgIf } from '@angular/common';
import { SongBase, SongOutputBase } from '../../entities/song';
import { Router } from '@angular/router';

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
    private readonly router: Router = inject(Router);

    music!: SongBase;

    async ngOnInit(): Promise<void> {
        this.music = await this.musicService.show(this.slug());
    }
    async onMusicSubmitted(music: SongBase) {
        const newMusic: SongOutputBase = await this.musicService.update(music, this.slug());
        console.log(newMusic);
        this.router.navigateByUrl(`/upload/${newMusic.slug}`);
    }
}
