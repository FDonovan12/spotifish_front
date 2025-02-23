import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl<string>): { [key: string]: any } | null => {
        const isLongEnough: boolean = control.value.length > 8;
        const hasSpecialChar: boolean = new RegExp('[@$!%*?&()-+]').test(
            // const hasSpecialChar: boolean = new RegExp('[^A-Za-z0-9]').test(
            control.value
        );
        const hasUpperChar: boolean = new RegExp('[A-Z]').test(control.value);
        const hasLowerChar: boolean = new RegExp('[a-z]').test(control.value);
        const hasNumber: boolean = new RegExp('[0-9]').test(control.value);
        const isValidPassword: boolean = isLongEnough && hasSpecialChar && hasUpperChar && hasLowerChar && hasNumber;
        return isValidPassword ? null : { passwordInvalid: { value: control.value } };
    };
}
