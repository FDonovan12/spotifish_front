import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegisterInput } from '../../entities/user';
import { birthAtValidator } from '../../validators/birth-date';
import { passwordValidator } from '../../validators/password-validator';
import { emailvalidator } from '../../validators/email-validator';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
    private readonly authService: AuthService = inject(AuthService);
    private readonly router: Router = inject(Router);

    form!: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required]),
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            password: new FormControl('', [
                Validators.required,
                // passwordValidator(),
            ]),
            passwordConfirmed: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email, emailvalidator()]),
            birthAt: new FormControl('', [Validators.required, birthAtValidator()]),
        });
    }

    onSubmitRegister() {
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
