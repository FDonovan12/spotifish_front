import { Component, input, InputSignal } from '@angular/core';
import { LikeableItemOutputBase } from '../../entities/likeable-item';
import { ChangePlaylistPlayerComponent } from '../change-playlist-player/change-playlist-player.component';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { Type } from '../../entities/permission-entity';

@Component({
    selector: 'app-title-section',
    standalone: true,
    imports: [ChangePlaylistPlayerComponent, LikeButtonComponent],
    templateUrl: './title-section.component.html',
    styleUrl: './title-section.component.css',
})
export class TitleSectionComponent {
    entity: InputSignal<LikeableItemOutputBase> = input.required<LikeableItemOutputBase>();

    Type: any;

    public get isPlaylist() {
        return this.entity().type === Type.playlist;
    }

    openSharedPlaylist() {
        throw new Error('Method not implemented.');
    }
}
