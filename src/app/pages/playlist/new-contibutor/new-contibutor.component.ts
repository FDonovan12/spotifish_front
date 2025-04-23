import { Component, inject, input, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../repositories/shared/shared.service';
import { PlaylistOutputBase } from '../../../entities/playlist';

@Component({
    selector: 'app-new-contibutor',
    imports: [],
    templateUrl: './new-contibutor.component.html',
    styleUrl: './new-contibutor.component.css',
})
export class NewContibutorComponent {
    slug: Signal<string> = input.required();
    private readonly router: Router = inject(Router);
    private readonly sharedService: SharedService = inject(SharedService);

    async ngOnInit(): Promise<void> {
        const playlist: PlaylistOutputBase = await this.sharedService.addContributor(this.slug());
        this.router.navigateByUrl(`playlist/${playlist.slug}`);
    }
}
