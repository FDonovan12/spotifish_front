import { Component, input, InputSignal, Signal } from '@angular/core';
import { ArtistOutputBase } from '../../entities/artist';
import { LinkShowComponent } from '../link-show/link-show.component';

@Component({
    selector: 'app-list-artists',
    imports: [LinkShowComponent],
    templateUrl: './list-artists.component.html',
    styleUrl: './list-artists.component.css',
})
export class ListArtistsComponent {
    items: InputSignal<{ artist: ArtistOutputBase }[]> = input.required<{ artist: ArtistOutputBase }[]>();
}
