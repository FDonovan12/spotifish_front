import { Component, computed, inject, input, signal, Signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { ErrorMessageService } from '@services/error-message/error-message.service';

@Component({
    selector: 'app-form-control',
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './form-control.component.html',
    styleUrl: './form-control.component.css',
})
export class FormControlComponent {
    readonly isRequired = input.required<boolean>();
    readonly type = input.required<string>();
    readonly label = input.required<string>();
    readonly labelError = input.required<string>();
    readonly formControlName = input.required<string>({ alias: 'id' });
    readonly form = input.required<FormGroup>();

    control: Signal<FormControl> = computed(() => this.form().get(this.formControlName()) as FormControl);
    value!: Signal<string>;
    errors: Signal<ValidationErrors | null> = computed(() => {
        this.value();
        return this.control().errors;
    });

    readonly errorMessageService: ErrorMessageService = inject(ErrorMessageService);

    readonly errorMessage: Signal<string> = computed(() =>
        this.errorMessageService.getCombinedMessage(this.errors(), this.labelError())
    );
    ngOnInit(): void {
        this.value = signal(this.control().value);
    }
}
