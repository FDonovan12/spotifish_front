import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

const NO_NAVABAR_URLS = ['login'];

@Component({
    selector: 'header[app-navbar]',
    standalone: true,
    imports: [RouterLink, AsyncPipe],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
    private readonly authService: AuthService = inject(AuthService);
    private readonly router: Router = inject(Router);

    isLoginPage: boolean | undefined;
    isRegisterPage: boolean | undefined;
    token$!: Observable<string | null>;
    isVisible$!: Observable<boolean>;
    debounceTimer: any;

    ngOnInit(): void {
        this.isVisible$ = this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map((event: NavigationEnd) => !NO_NAVABAR_URLS.some((url) => event.url.includes(url)))
        );

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.isLoginPage = event.url?.includes('login');
                this.isRegisterPage = event.url?.includes('register');
            }
        });
        this.token$ = this.authService.token$;
    }

    disconect() {
        this.authService.disconnect();
    }

    submitSearch(eventSearch: Event) {
        const inputElement = eventSearch.target as HTMLInputElement;
        const searchValue = inputElement.value;
        if (searchValue == '') {
            return;
        }
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.router.navigateByUrl('/search/' + searchValue);
        }, 200);
    }
}
