import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailvalidator(): ValidatorFn {
    return (
        control: AbstractControl<string>
    ): { [key: string]: any } | null => {
        const isValidEmail: boolean = new RegExp(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        ).test(control.value);
        return isValidEmail
            ? null
            : { emailvalidation: { value: control.value } };
    };
}
