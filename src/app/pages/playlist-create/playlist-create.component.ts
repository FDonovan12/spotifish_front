import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaylistBase } from '../../entities/playlist';
import { PlaylistService } from '../../services/playlist/playlist.service';

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

    form!: FormGroup; // Notifie que la popup doit être fermée

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
            console.log(playlistInput);
            this.playlistService.new(playlistInput);
            this.close();
        }
    }
}
