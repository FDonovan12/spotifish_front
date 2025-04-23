import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    private readonly authService: AuthService = inject(AuthService);
    private readonly router: Router = inject(Router);

    form: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        keepConnected: new FormControl(false),
    });

    async onLoginSubmit() {
        if (this.form.valid) {
            const { username, password, keepConnected } = this.form.value;
            try {
                await this.authService.login(username, password, keepConnected);
                this.router.navigateByUrl('/library');
            } catch (error) {
                console.error(error);
            }
        }
    }
}
