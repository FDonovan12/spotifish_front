import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(passwordKey = 'password', confirmKey = 'confirmPassword'): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
        const passwordControl = form.get(passwordKey);
        const confirmControl = form.get(confirmKey);

        if (!passwordControl || !confirmControl) return null;

        const password = passwordControl.value;
        const confirm = confirmControl.value;

        if (confirmControl.errors && !confirmControl.errors['passwordMismatch']) return null;

        if (password !== confirm) {
            console.log('differents', password, confirm);
            confirmControl.setErrors({ passwordMismatch: true });
        } else {
            const errors = confirmControl.errors;
            if (errors) {
                delete errors['passwordMismatch'];
                if (Object.keys(errors).length === 0) {
                    confirmControl.setErrors(null);
                } else {
                    confirmControl.setErrors(errors);
                }
            }
        }

        return null; // Toujours null sur le groupe, car l’erreur est sur confirmPassword
    };
}
