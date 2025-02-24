import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable, OnInit, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { UserLoginResponse, UserRegisterInput } from '../../entities/user';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly httpClient: HttpClient = inject(HttpClient);
    private readonly router: Router = inject(Router);
    private readonly rootUrl: string = environment.API_URL;
    private readonly resource: string = 'security';

    test = signal('');

    private accessToken$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    private refreshToken$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    private keepConnected: boolean = false;

    get token(): string {
        const accessTokenIsValid = !this.isTokenExpired(this.accessToken$.value || '');
        const refreshTokenIsValid = !this.isTokenExpired(this.refreshToken$.value || '');
        if (accessTokenIsValid) {
            return this.accessToken$.value || '';
        }
        console.log('accessToken expired');
        if (refreshTokenIsValid) {
            this.refreshToken();
            return this.refreshToken$.value || '';
        }
        console.log('refreshToken expired');
        this.disconnect();
        return '';
    }

    get token$(): Observable<string | null> {
        return this.accessToken$.asObservable();
    }

    constructor() {
        const accessToken = localStorage.getItem(environment.ACCESS_TOKEN_LOCAL_STORAGE);
        const refreshToken = localStorage.getItem(environment.REFRESH_TOKEN_LOCAL_STORAGE);
        this.accessToken$.next(accessToken);
        this.refreshToken$.next(refreshToken);
    }

    async login(username: string, password: string, keepConnected: boolean): Promise<void> {
        this.keepConnected = keepConnected;
        const url = `${this.rootUrl}/${this.resource}/login`;
        const observable$: Observable<UserLoginResponse> = this.httpClient.post<UserLoginResponse>(url, { username, password });
        return this.stockToken(observable$);
    }

    async refreshToken() {
        const url = `${this.rootUrl}/${this.resource}/refresh`;
        const observable$: Observable<UserLoginResponse> = this.httpClient.post<UserLoginResponse>(url, { refreshToken: this.refreshToken$.value });
        return this.stockToken(observable$);
    }

    async stockToken(observable$: Observable<UserLoginResponse>) {
        return lastValueFrom(observable$).then((res) => {
            this.accessToken$.next(res.accessToken);
            this.refreshToken$.next(res.refreshToken);
            if (this.keepConnected) {
                localStorage.setItem(environment.ACCESS_TOKEN_LOCAL_STORAGE, res.accessToken);
                localStorage.setItem(environment.REFRESH_TOKEN_LOCAL_STORAGE, res.refreshToken);
            }
        });
    }

    // stockToken(accessToken: string, refreshToken: string) {
    //     this.accessToken$.next(accessToken);
    //     this.refreshToken$.next(refreshToken);
    // }

    disconnect() {
        this.accessToken$.next(null);
        this.refreshToken$.next(null);
        localStorage.removeItem(environment.ACCESS_TOKEN_LOCAL_STORAGE);
        localStorage.removeItem(environment.REFRESH_TOKEN_LOCAL_STORAGE);
        this.router.navigateByUrl('/login');
    }

    async register(user: UserRegisterInput): Promise<void> {
        const url = `${this.rootUrl}/${this.resource}/register`;
        const observable$: Observable<void> = this.httpClient.post<void>(url, user);
        return lastValueFrom(observable$);
    }

    decodeToken(token: string): any {
        return jwtDecode<JwtPayload>(token);
    }

    getTokenExpirationDate(token: string): Date | null {
        const decoded = this.decodeToken(token);
        if (decoded && decoded.exp) {
            console.log(new Date(decoded.exp * 1000));
            return new Date(decoded.exp * 1000); // `exp` est en secondes
        }
        return null;
    }

    isTokenExpired(token: string): boolean {
        if (!token) {
            return false;
        }
        const expirationDate = this.getTokenExpirationDate(token);
        return expirationDate ? expirationDate < new Date() : true;
    }

    get user() {
        const decoded = this.decodeToken(this.token || '');
        return null;
    }
}
