import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaylistBase } from '../../entities/playlist';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-playlist-create',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './playlist-create.component.html',
    styleUrl: './playlist-create.component.css',
})
export class PlaylistCreateComponent {
    @Output() closed = new EventEmitter<void>();

    private readonly playlistService: PlaylistService = inject(PlaylistService);
    private readonly router: Router = inject(Router);

    form!: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl<string>('', [Validators.required]),
            description: new FormControl<string>('', [Validators.required]),
            isPrivate: new FormControl<boolean>(false),
        });
    }

    close() {
        this.closed.emit();
    }

    async onFormSubmit(): Promise<void> {
        if (this.form.valid) {
            const playlistInput: PlaylistBase = {
                ...this.form.value,
            };
            const playlist = this.playlistService.new(playlistInput);
            this.close();
            this.router.navigateByUrl('/playlist/' + (await playlist).slug);
        }
    }
}
