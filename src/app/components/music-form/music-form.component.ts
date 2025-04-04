import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MusicService } from '../../services/music/music.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SongBase } from '../../entities/song';

@Component({
    selector: 'app-music-form',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './music-form.component.html',
    styleUrl: './music-form.component.css',
})
export class MusicFormComponent implements OnInit {
    @Input() musicToEdit?: SongBase;
    @Output() formSubimtted: EventEmitter<SongBase> = new EventEmitter();
    private readonly musicService: MusicService = inject(MusicService);

    form!: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl<string>(this.musicToEdit?.name || '', [Validators.required]),
            createdAt: new FormControl<Date>(this.musicToEdit?.createdAt || new Date(), [Validators.required]),
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
