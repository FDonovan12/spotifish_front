import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

const NO_NAVABAR_URLS = ['login'];

@Component({
    selector: 'header[app-navbar]',
    imports: [RouterLink, AsyncPipe],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
    readonly authService: AuthService = inject(AuthService);
    private readonly router: Router = inject(Router);

    isLoginPage: WritableSignal<boolean> = signal(true);
    isRegisterPage: WritableSignal<boolean> = signal(true);
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
                this.isLoginPage.set(event.url?.includes('login'));
                this.isRegisterPage.set(event.url?.includes('register'));
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
