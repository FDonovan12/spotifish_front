import { Component, inject, input, InputSignal } from '@angular/core';
import { LinkShowComponent } from '@atoms/link-show/link-show.component';
import { ListArtistsComponent } from '@atoms/list-artists/list-artists.component';
import { AlbumOutputBase } from '@entities/album';
import { ArtistOutputBase } from '@entities/artist';
import { Type } from '@entities/permission-entity';
import { PlaylistOutputBase } from '@entities/playlist';
import { SongOutputBase } from '@entities/song';
import { AddToPlaylistComponent } from '@molecules/add-to-playlist/add-to-playlist.component';
import { ChangePlaylistPlayerComponent } from '@molecules/change-playlist-player/change-playlist-player.component';
import { LikeButtonComponent } from '@molecules/like-button/like-button.component';
import { UploadService } from '@services/upload/upload.service';

@Component({
    selector: 'app-card-likeable-item',
    imports: [
        ChangePlaylistPlayerComponent,
        LinkShowComponent,
        LikeButtonComponent,
        AddToPlaylistComponent,
        ListArtistsComponent,
    ],
    templateUrl: './card-likeable-item.component.html',
    styleUrl: './card-likeable-item.component.css',
})
export class CardLikeableItemComponent {
    entity: InputSignal<SongOutputBase | ArtistOutputBase | AlbumOutputBase | PlaylistOutputBase> = input.required<
        SongOutputBase | ArtistOutputBase | AlbumOutputBase | PlaylistOutputBase
    >();

    protected readonly uploadService: UploadService = inject(UploadService);

    public get isSong(): boolean {
        return this.entity().type === Type.song;
    }

    public get getSong(): SongOutputBase {
        return this.entity() as SongOutputBase;
    }
}
