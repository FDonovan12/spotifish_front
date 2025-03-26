import { Component, computed, input, InputSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SluggerEntity } from '../../entities/slugger-entity';

@Component({
    selector: 'app-link-show',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './link-show.component.html',
    styleUrl: './link-show.component.css',
})
export class LinkShowComponent {
    readonly href = input<string | null>(null);
    readonly entity = input<SluggerEntity | null>(null);
    computedHref = computed(() => {
        return this.href() ?? (this.entity() ? `/${this.entity()!.type}/${this.entity()!.slug}` : '#');
    });
}
