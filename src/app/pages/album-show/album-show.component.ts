import { Component, inject, input, Input, Signal } from '@angular/core';
import { LikeButtonComponent } from '../../components/like-button/like-button.component';
import { AlbumService } from '../../services/album/album.service';
import { AlbumOutputShow } from '../../entities/album';

@Component({
    selector: 'app-album-show',
    standalone: true,
    imports: [LikeButtonComponent],
    templateUrl: './album-show.component.html',
    styleUrl: './album-show.component.css',
})
export class AlbumShowComponent {
    slug: Signal<string> = input.required();

    private readonly albumService: AlbumService = inject(AlbumService);

    album!: AlbumOutputShow;

    async ngOnInit(): Promise<void> {
        this.album = await this.albumService.show(this.slug());
    }
}
