import { Component, inject, input, InputSignal, output, viewChild, ViewContainerRef } from '@angular/core';
import { LikeableItemOutputBase } from '../../../entities/likeable-item';
import { Type } from '../../../entities/permission-entity';
import { PlaylistOutputBase } from '../../../entities/playlist';
import { AuthService } from '../../../services/auth/auth.service';
import { PopupService } from '../../../services/popup/popup.service';
import { ChangePlaylistPlayerComponent } from '../../molecules/change-playlist-player/change-playlist-player.component';
import { LikeButtonComponent } from '../../molecules/like-button/like-button.component';

@Component({
    selector: 'app-title-section',
    imports: [ChangePlaylistPlayerComponent, LikeButtonComponent],
    templateUrl: './title-section.component.html',
    styleUrl: './title-section.component.css',
})
export class TitleSectionComponent {
    readonly removeEntity = output<void>();
    readonly popupContainer = viewChild.required('popupContainer', { read: ViewContainerRef });
    entity: InputSignal<LikeableItemOutputBase> = input.required<LikeableItemOutputBase>();

    private readonly popupService: PopupService = inject(PopupService);
    private readonly authService: AuthService = inject(AuthService);

    ngAfterViewInit() {
        this.popupService.setViewContainerRef(this.popupContainer());
    }

    public get isPlaylist() {
        return this.entity().type === Type.playlist;
    }

    public get isContributor() {
        if (this.entity().type !== Type.playlist) return false;
        const playlist: PlaylistOutputBase = this.entity() as PlaylistOutputBase;
        const userEmail = this.authService.userEmail;
        return playlist.contributors.some((contributor) => contributor.user.email === userEmail);
    }

    public get isOwner() {
        if (this.entity().type !== Type.playlist) return false;
        const playlist: PlaylistOutputBase = this.entity() as PlaylistOutputBase;
        const userEmail = this.authService.userEmail;
        return playlist.contributors.some((contributor) => contributor.user.email === userEmail && contributor.isOwner);
    }

    openSharedPlaylist() {
        if (this.entity().type !== Type.playlist) return;
        this.popupService.openSharedPlaylist(this.entity() as PlaylistOutputBase);
    }

    openModifyPlaylist() {
        if (this.entity().type !== Type.playlist) return;
        this.popupService.openPlaylistCreate(this.entity() as PlaylistOutputBase);
    }

    onRemoveEntity() {
        this.removeEntity.emit();
    }
}
