import { Component, inject, OnInit, input, output } from '@angular/core';
import { MusicService } from '../../../repositories/song/music.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SongBase } from '../../../entities/song';

@Component({
    selector: 'app-music-form',
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './music-form.component.html',
    styleUrl: './music-form.component.css',
})
export class MusicFormComponent implements OnInit {
    readonly musicToEdit = input<SongBase>();
    readonly formSubimtted = output<SongBase>();
    private readonly musicService: MusicService = inject(MusicService);

    form!: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl<string>(this.musicToEdit()?.name || '', [Validators.required]),
            createdAt: new FormControl<Date>(this.musicToEdit()?.createdAt || new Date(), [Validators.required]),
        });
    }

    async onFormSubmit(): Promise<void> {
        if (this.form.valid) {
            const musicInput: SongBase = {
                ...this.form.value,
            };
            this.formSubimtted.emit(musicInput);
        }
    }
}
