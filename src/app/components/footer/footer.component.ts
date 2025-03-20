import { Component, input } from '@angular/core';
import { SongOutputBase } from '../../entities/song';

@Component({
    selector: 'footer[app-footer]',
    standalone: true,
    imports: [],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
})
export class FooterComponent {
    private readonly service: Service = inject(Service);
}
