import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MusicService } from '../../services/music/music.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MusicCreateInput, MusicEditInput } from '../../entities/music';
import { Body } from '../../entities/response';

@Component({
    selector: 'app-music-form',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './music-form.component.html',
    styleUrl: './music-form.component.css',
})
export class MusicFormComponent implements OnInit {
    @Input() musicToEdit?: Body<MusicEditInput>;
    @Output() formSubimtted: EventEmitter<MusicEditInput | MusicCreateInput> = new EventEmitter();
    private readonly musicService: MusicService = inject(MusicService);

    form!: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl<string>(this.musicToEdit?.data.name || '', [Validators.required]),
            description: new FormControl<string>(this.musicToEdit?.data.description || '', [Validators.required]),
            image: new FormControl<string>(this.musicToEdit?.data.image || '', [Validators.required]),
        });
    }

    async onFormSubmit(): Promise<void> {
        if (this.form.valid) {
            const musicInput: MusicEditInput | MusicCreateInput = {
                ...this.form.value,
            };
            this.formSubimtted.emit(musicInput);
        }
    }
}
