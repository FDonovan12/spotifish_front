import { Component, inject, Input, OnInit } from '@angular/core';
import { MusicService } from '../../services/music/music.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MusicFormComponent } from '../../components/music-form/music-form.component';
import { Router } from '@angular/router';
import { SongBase, SongOutputBase } from '../../entities/song';

@Component({
    selector: 'app-music-create',
    imports: [MusicFormComponent],
    templateUrl: './music-create.component.html',
    styleUrl: './music-create.component.css',
})
export class MusicCreateComponent {
    private readonly musicService: MusicService = inject(MusicService);
    private readonly router: Router = inject(Router);

    async onMusicSubmitted(musicInput: SongBase | SongBase): Promise<void> {
        const newMusic: SongOutputBase = await this.musicService.create(musicInput);
        this.router.navigateByUrl(`/upload/${newMusic.slug}`);
    }
}
