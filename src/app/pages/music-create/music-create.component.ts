import { Component, inject, Input, OnInit } from '@angular/core';
import { MusicService } from '../../services/music/music.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MusicFormComponent } from '../../components/music-form/music-form.component';
import { Router } from '@angular/router';
import { MusicCreateInput, MusicEditInput } from '../../entities/music';

@Component({
    selector: 'app-music-create',
    standalone: true,
    imports: [MusicFormComponent],
    templateUrl: './music-create.component.html',
    styleUrl: './music-create.component.css',
})
export class MusicCreateComponent {
    private readonly musicService: MusicService = inject(MusicService);
    private readonly router: Router = inject(Router);

    async onMusicSubmitted(
        musicInput: MusicEditInput | MusicCreateInput
    ): Promise<void> {
        await this.musicService.create(musicInput);
        this.router.navigateByUrl(`/power/${musicInput.slug}`);
    }
}
