import { Component, inject, Input } from '@angular/core';
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
    @Input() slug?: string;

    private readonly artisteService: ArtisteService = inject(ArtisteService);

    artist!: ArtistOutputShow;

    async ngOnInit(): Promise<void> {
        this.artist = await this.artisteService.show(this.slug || '');
    }
}
