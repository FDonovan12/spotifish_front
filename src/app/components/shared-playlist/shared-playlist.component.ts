import { Component, EventEmitter, inject, input, InputSignal, Output } from '@angular/core';
import { SharedService } from '../../services/Shared/shared.service';
import { PlaylistOutputBase } from '../../entities/playlist';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedInput, SharedOutputBase } from '../../entities/shared';

@Component({
    selector: 'app-shared-playlist',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './shared-playlist.component.html',
    styleUrl: './shared-playlist.component.css',
})
export class SharedPlaylistComponent {
    @Output() closed = new EventEmitter<void>();
    @Output() shared = new EventEmitter<SharedOutputBase>();
    playlist: InputSignal<PlaylistOutputBase> = input.required<PlaylistOutputBase>();

    private readonly sharedService: SharedService = inject(SharedService);

    form!: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            expireAt: new FormControl<Date>(new Date(), [Validators.required]),
            remainingInvitation: new FormControl<string>('', [Validators.required]),
        });
    }

    close() {
        this.closed.emit();
    }

    async onFormSubmit(): Promise<void> {
        if (this.form.valid) {
            const sharedInput: SharedInput = {
                ...this.form.value,
                playlistSlug: this.playlist().slug,
            };
            const shared = await this.sharedService.create(sharedInput);
            navigator.clipboard.writeText(`${window.location.origin}/shared/${shared.slug}`);
            this.close();
        }
    }
}
