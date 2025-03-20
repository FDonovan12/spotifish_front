import { Component, inject, Input } from '@angular/core';
import { LikeButtonComponent } from '../../components/like-button/like-button.component';
import { AlbumService } from '../../services/album-service/album.service';
import { AlbumOutputShow } from '../../entities/album';

@Component({
    selector: 'app-album-show',
    standalone: true,
    imports: [LikeButtonComponent],
    templateUrl: './album-show.component.html',
    styleUrl: './album-show.component.css',
})
export class AlbumShowComponent {
    @Input() slug?: string;

    private readonly albumService: AlbumService = inject(AlbumService);

    album?: AlbumOutputShow;

    async ngOnInit(): Promise<void> {
        this.album = await this.albumService.show(this.slug || '');
    }
}
