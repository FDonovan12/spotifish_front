import { AbstractControl, ValidatorFn } from '@angular/forms';

export function birthAtValidator(): ValidatorFn {
    return (control: AbstractControl<string>): { [key: string]: any } | null => {
        const birthAt: Date = new Date(control.value);
        const inThePast: boolean = birthAt <= new Date();
        return inThePast ? null : { inThePastBirthDate: { value: control.value } };
    };
}
