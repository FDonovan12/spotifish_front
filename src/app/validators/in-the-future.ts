import { AbstractControl, ValidatorFn } from '@angular/forms';

export function inTheFuture(): ValidatorFn {
    return (control: AbstractControl<string>): { [key: string]: any } | null => {
        const date: Date = new Date(control.value);
        const inTheFuture: boolean = date >= new Date();
        return inTheFuture ? null : { inTheFuture: { value: control.value } };
    };
}
