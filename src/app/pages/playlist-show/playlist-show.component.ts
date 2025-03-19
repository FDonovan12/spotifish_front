import { Component, inject, Input } from '@angular/core';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { PlaylistOutputBase } from '../../entities/playlist';
import { DatePipe } from '@angular/common';
import { UserLikeableItemService } from '../../services/user-likeable-item-service/user-likeable-item.service';
import { LikeButtonComponent } from '../../components/like-button/like-button.component';

@Component({
    selector: 'app-playlist-show',
    standalone: true,
    imports: [DatePipe, LikeButtonComponent],
    templateUrl: './playlist-show.component.html',
    styleUrl: './playlist-show.component.css',
})
export class PlaylistShowComponent {
    @Input() slug?: string;

    private readonly playlistService: PlaylistService = inject(PlaylistService);
    private readonly userLikeableItemService: UserLikeableItemService = inject(UserLikeableItemService);

    playlist?: PlaylistOutputBase;

    async ngOnInit(): Promise<void> {
        this.playlist = await this.playlistService.show(this.slug || '');
        console.log(this.playlist);
    }

    like(slug: string) {
        this.userLikeableItemService.like(slug);
    }

    dislike(slug: string) {
        this.userLikeableItemService.dislike(slug);
    }
}
