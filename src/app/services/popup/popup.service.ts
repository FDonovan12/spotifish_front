import { ComponentRef, Injectable, input, signal, ViewContainerRef, WritableSignal } from '@angular/core';
import { PlaylistCreateComponent } from '../../components/organisms/playlist-create/playlist-create.component';
import { SharedPlaylistComponent } from '../../components/organisms/shared-playlist/shared-playlist.component';
import { PlaylistOutputBase } from '../../entities/playlist';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    private popupRefPlaylist?: ComponentRef<PlaylistCreateComponent>;
    private popupRefShared?: ComponentRef<SharedPlaylistComponent>;
    private viewContainerRef?: ViewContainerRef;

    setViewContainerRef(viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }

    openPlaylistCreate(playlist: PlaylistOutputBase | undefined = undefined) {
        if (!this.viewContainerRef || this.popupRefPlaylist) return;

        this.popupRefPlaylist = this.viewContainerRef.createComponent(PlaylistCreateComponent);
        this.popupRefPlaylist.setInput('playlist', playlist);
        this.popupRefPlaylist.instance.closed.subscribe(() => this.closePlaylistCreate());
    }

    private closePlaylistCreate() {
        if (this.popupRefPlaylist) {
            this.popupRefPlaylist.destroy();
            this.popupRefPlaylist = undefined;
        }
    }

    openSharedPlaylist(playlist: PlaylistOutputBase) {
        if (!this.viewContainerRef || this.popupRefShared) return;
        this.popupRefShared = this.viewContainerRef.createComponent(SharedPlaylistComponent);
        this.popupRefShared.setInput('playlist', playlist);
        this.popupRefShared.instance.closed.subscribe(() => this.closeSharedPlaylist());
    }

    private closeSharedPlaylist() {
        if (this.popupRefShared) {
            this.popupRefShared.destroy();
            this.popupRefShared = undefined;
        }
    }
}
