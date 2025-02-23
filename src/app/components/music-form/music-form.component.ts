import {
    Component,
    EventEmitter,
    inject,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { MusicService } from '../../services/music/music.service';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MusicCreateInput, MusicEditInput } from '../../entities/music';

@Component({
    selector: 'app-music-form',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './music-form.component.html',
    styleUrl: './music-form.component.css',
})
export class MusicFormComponent implements OnInit {
    @Input() musicToEdit?: MusicEditInput;
    @Output() formSubimtted: EventEmitter<MusicEditInput | MusicCreateInput> =
        new EventEmitter();
    private readonly musicService: MusicService = inject(MusicService);

    form!: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl<string>(this.musicToEdit?.name || '', [
                Validators.required,
            ]),
            description: new FormControl<string>(
                this.musicToEdit?.description || '',
                [Validators.required]
            ),
            image: new FormControl<string>(this.musicToEdit?.image || '', [
                Validators.required,
            ]),
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
