import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormControlComponent } from '../../components/atoms/form-control/form-control.component';
import { UserRegisterInput } from '../../entities/user';
import { AuthService } from '../../services/auth/auth.service';
import { birthAtValidator } from '../../validators/birth-date';
import { emailValidator } from '../../validators/email-validator';
import { confirmPasswordValidator } from '@validators/confirm-password';

@Component({
    selector: 'app-register',
    imports: [FormsModule, ReactiveFormsModule, FormControlComponent],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
    private readonly authService: AuthService = inject(AuthService);
    private readonly router: Router = inject(Router);
    private readonly formBuilder: FormBuilder = inject(FormBuilder);

    form!: FormGroup;
    showErrorConfirmedPassword: WritableSignal<boolean> = signal(false);

    ngOnInit(): void {
        this.form = this.formBuilder.group(
            {
                name: ['', Validators.required],
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                password: ['', [Validators.minLength(5)]],
                confirmPassword: ['', Validators.required],
                email: ['', [Validators.required, emailValidator()]],
                birthAt: ['', [Validators.required, birthAtValidator]],
            },
            { validators: confirmPasswordValidator() }
        );
        console.log(this.form);
        console.log(this.form.controls['email']);
        console.log(typeof this.form.controls['email']);
    }

    onSubmitRegister() {
        this.form.markAllAsTouched();
        const samePassword = this.form.controls['password'].value === this.form.controls['passwordConfirmed'].value;
        if (!samePassword) {
            this.showErrorConfirmedPassword.set(true);
            return;
        }
        this.showErrorConfirmedPassword.set(false);
        if (this.form.valid) {
            const user: UserRegisterInput = {
                ...this.form.value,
                // birthAt: UserRegisterInput.formDate(this.form.value.birthAt),
            };
            this.authService
                .register(user)
                .then((response) => {
                    this.router.navigate(['/login']);
                })
                .catch((error) => {
                    console.error("Erreur lors de l'inscription", error);
                });
        }
    }
}
