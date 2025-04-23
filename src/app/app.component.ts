import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/organisms/footer/footer.component';
import { NavbarComponent } from './components/organisms/navbar/navbar.component';

@Component({
    selector: 'body[app-root]',
    imports: [RouterOutlet, NavbarComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {}
