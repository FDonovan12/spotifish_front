import { ComponentRef, Injectable, signal, ViewContainerRef, WritableSignal } from '@angular/core';
import { PlaylistCreateComponent } from '../../pages/playlist-create/playlist-create.component';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    private popupRef?: ComponentRef<PlaylistCreateComponent>;
    private viewContainerRef?: ViewContainerRef;

    setViewContainerRef(viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }

    openPlaylistCreate() {
        if (!this.viewContainerRef || this.popupRef) return;

        this.popupRef = this.viewContainerRef.createComponent(PlaylistCreateComponent);
        this.popupRef.instance.closed.subscribe(() => this.closePlaylistCreate());
    }

    private closePlaylistCreate() {
        if (this.popupRef) {
            this.popupRef.destroy();
            this.popupRef = undefined;
        }
    }
}
