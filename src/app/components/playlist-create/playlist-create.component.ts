import { Component, EventEmitter, inject, input, InputSignal, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaylistBase, PlaylistOutputBase } from '../../entities/playlist';
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
    playlist: InputSignal<PlaylistOutputBase | undefined> = input();

    private readonly playlistService: PlaylistService = inject(PlaylistService);
    private readonly router: Router = inject(Router);

    form!: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl<string>(this.playlist()?.name || '', [Validators.required]),
            description: new FormControl<string>(this.playlist()?.description || '', [Validators.required]),
            isPrivate: new FormControl<boolean>(this.playlist()?.isPrivate || false),
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
            let playlist;
            if (this.playlist()) {
                playlist = await this.playlistService.edit(playlistInput, this.playlist()!.slug);
                this.router.navigateByUrl('/library');
            } else {
                playlist = this.playlistService.new(playlistInput);
            }
            this.close();
            this.router.navigateByUrl('/playlist/' + (await playlist).slug);
        }
    }
}
