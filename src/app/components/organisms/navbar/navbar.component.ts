import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Debounce } from 'app/decorator/debounce';
import { filter, map, Observable } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';

const NO_NAVABAR_URLS = ['login'];

@Component({
    selector: 'header[app-navbar]',
    imports: [RouterLink, AsyncPipe, FormsModule],
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

    search = signal('');

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

    disconnect() {
        this.authService.disconnect();
    }

    @Debounce(300)
    submitSearch(searchValue: string) {
        if (searchValue == '') {
            return;
        }
        this.router.navigateByUrl('/search/' + searchValue);
    }
}
