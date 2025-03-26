import { Component, inject, input, Input, Signal } from '@angular/core';
import { ArtistOutputShow } from '../../entities/artist';
import { ArtisteService } from '../../services/Artiste/artiste.service';
import { LinkShowComponent } from '../../components/link-show/link-show.component';

@Component({
    selector: 'app-artist-show',
    standalone: true,
    imports: [LinkShowComponent],
    templateUrl: './artist-show.component.html',
    styleUrl: './artist-show.component.css',
})
export class ArtistShowComponent {
    slug: Signal<string> = input.required();

    private readonly artisteService: ArtisteService = inject(ArtisteService);

    artist!: ArtistOutputShow;

    async ngOnInit(): Promise<void> {
        this.artist = await this.artisteService.show(this.slug());
    }
}
