import { Component, inject, input, InputSignal, output } from '@angular/core';
import { SharedService } from '../../../repositories/shared/shared.service';
import { PlaylistOutputBase } from '../../../entities/playlist';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedInput, SharedOutputBase } from '../../../entities/shared';
import { inTheFuture } from '../../../validators/in-the-future';

@Component({
    selector: 'app-shared-playlist',
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './shared-playlist.component.html',
    styleUrl: './shared-playlist.component.css',
})
export class SharedPlaylistComponent {
    readonly closed = output<void>();
    readonly shared = output<SharedOutputBase>();
    playlist: InputSignal<PlaylistOutputBase> = input.required<PlaylistOutputBase>();

    private readonly sharedService: SharedService = inject(SharedService);

    form!: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            expireAt: new FormControl<Date>(new Date(), [inTheFuture()]),
            remainingInvitation: new FormControl<string>('', [Validators.required]),
        });
    }

    close() {
        // TODO: The 'emit' function requires a mandatory void argument
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
