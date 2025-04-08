import { Component, inject, input, InputSignal } from '@angular/core';
import { UploadService } from '../../services/upload/upload.service';
import { LikeableItemOutputBase } from '../../entities/likeable-item';
import { Type } from '../../entities/permission-entity';
import { ImageInterface } from '../../entities/image-interface';
import { ChangePlaylistPlayerComponent } from '../change-playlist-player/change-playlist-player.component';
import { LinkShowComponent } from '../link-show/link-show.component';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { AddToPlaylistComponent } from '../add-to-playlist/add-to-playlist.component';
import { SongOutputBase } from '../../entities/song';
import { ArtistOutputBase } from '../../entities/artist';
import { AlbumOutputBase } from '../../entities/album';
import { PlaylistOutputBase } from '../../entities/playlist';
import { ListArtistsComponent } from '../list-artists/list-artists.component';

@Component({
    selector: 'app-card-likeable-item',
    standalone: true,
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
    // entity: InputSignal<LikeableItemOutputBase & ImageInterface> = input.required<
    //     LikeableItemOutputBase & ImageInterface
    // >();

    protected readonly uploadService: UploadService = inject(UploadService);
    Type = Type;

    isSong(): boolean {
        return this.entity().type === Type.song;
    }

    getSong(): SongOutputBase {
        return this.entity() as SongOutputBase;
    }
}
