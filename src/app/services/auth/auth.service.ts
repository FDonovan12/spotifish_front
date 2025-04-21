import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { accessTokenDecode, UserLoginResponse, UserRegisterInput } from '../../entities/user';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly httpClient: HttpClient = inject(HttpClient);
    private readonly router: Router = inject(Router);
    private readonly apiUrl: string = environment.API_URL;
    private readonly resource: string = 'security';

    private accessToken$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    private refreshToken$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    private keepConnected: boolean = true;

    get token(): string {
        const accessTokenIsValid = !this.isTokenExpired(this.accessToken$.value || '');
        const refreshTokenIsValid = !this.isTokenExpired(this.refreshToken$.value || '');
        if (accessTokenIsValid) {
            return this.accessToken$.value || '';
        }
        if (refreshTokenIsValid) {
            this.refreshToken();
            return this.refreshToken$.value || '';
        }
        this.disconnect();
        return '';
    }

    get token$(): Observable<string | null> {
        return this.accessToken$.asObservable();
    }

    constructor() {
        const accessToken = localStorage.getItem(environment.ACCESS_TOKEN_LOCAL_STORAGE);
        const refreshToken = localStorage.getItem(environment.REFRESH_TOKEN_LOCAL_STORAGE);
        this.keepConnected = !!localStorage.getItem(environment.KEEP_CONNECTED_LOCAL_STORAGE);
        this.accessToken$.next(accessToken);
        this.refreshToken$.next(refreshToken);
    }

    async login(username: string, password: string, keepConnected: boolean): Promise<void> {
        this.keepConnected = keepConnected;
        if (keepConnected) {
            localStorage.setItem(environment.KEEP_CONNECTED_LOCAL_STORAGE, 'true');
        }
        const url = `${this.apiUrl}/${this.resource}/login`;
        const observable$: Observable<UserLoginResponse> = this.httpClient.post<UserLoginResponse>(url, {
            username,
            password,
        });
        return this.stockToken(observable$);
    }

    async refreshToken() {
        const url = `${this.apiUrl}/${this.resource}/refresh`;
        const observable$: Observable<UserLoginResponse> = this.httpClient.post<UserLoginResponse>(url, {
            refreshToken: this.refreshToken$.value,
        });
        return this.stockToken(observable$);
    }

    async stockToken(observable$: Observable<UserLoginResponse>) {
        return lastValueFrom(observable$).then((res) => {
            this.accessToken$.next(res.accessToken);
            this.refreshToken$.next(res.refreshToken);
            localStorage.setItem(environment.ACCESS_TOKEN_LOCAL_STORAGE, res.accessToken);
            if (this.keepConnected) {
                localStorage.setItem(environment.REFRESH_TOKEN_LOCAL_STORAGE, res.refreshToken);
            }
        });
    }

    disconnect() {
        this.accessToken$.next(null);
        this.refreshToken$.next(null);
        localStorage.removeItem(environment.ACCESS_TOKEN_LOCAL_STORAGE);
        localStorage.removeItem(environment.REFRESH_TOKEN_LOCAL_STORAGE);
        localStorage.removeItem(environment.KEEP_CONNECTED_LOCAL_STORAGE);
        this.router.navigateByUrl('/login');
    }

    async register(user: UserRegisterInput): Promise<void> {
        const url = `${this.apiUrl}/${this.resource}/register`;
        const observable$: Observable<void> = this.httpClient.post<void>(url, user);
        return lastValueFrom(observable$);
    }

    decodeToken(token: string): accessTokenDecode {
        return jwtDecode<JwtPayload>(token) as accessTokenDecode;
    }

    getTokenExpirationDate(token: string): Date | null {
        const decoded = this.decodeToken(token);
        if (decoded && decoded.exp) {
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

    public get isArtist(): boolean {
        const decoded = this.decodeToken(this.token);
        return decoded?.isArtist;
    }

    public get userSlug(): string {
        const decoded = this.decodeToken(this.token);
        return decoded?.slug;
    }

    get userName(): string {
        const decoded = this.decodeToken(this.token || '');
        return decoded.name;
    }

    get userEmail(): string {
        const decoded = this.decodeToken(this.token || '');
        return decoded.sub;
    }
}
