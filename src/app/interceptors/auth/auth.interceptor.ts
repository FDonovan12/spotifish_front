import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { from, NEVER } from 'rxjs';

const NO_BEARER_URLS = ['/security'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    let toHandle = req;

    if (!NO_BEARER_URLS.some((url) => req.url.includes(url))) {
        console.log(req.url);
        if (authService.token) {
            toHandle = req.clone({
                headers: req.headers.set('Autorization', `Bearer ${authService.token}`),
            });
        } else {
            authService.disconnect();
            router.navigateByUrl('/login');
            return from(NEVER);
        }
    }
    console.log(toHandle);
    return next(toHandle);
};
