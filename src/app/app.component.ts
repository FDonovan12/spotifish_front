import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LikedLibraryComponent } from './pages/liked-library/liked-library.component';
import { StorageSongComponent } from './components/storage-song/storage-song.component';

@Component({
    selector: 'body[app-root]',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, FooterComponent, LikedLibraryComponent, StorageSongComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {}
