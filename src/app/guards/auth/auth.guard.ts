import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    if (!authService.token) {
        console.log('redirect home -> login');
        authService.disconnect();
    }
    return true;
};

export const noAuthGuard: CanActivateFn = () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    if (authService.token) {
        console.log('redirect login -> home');
        return router.navigateByUrl('/');
    }
    return true;
};
