import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { SluggerEntity } from '../../entities/slugger-entity';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-link-show',
    imports: [RouterLink],
    templateUrl: './link-show.component.html',
    styleUrl: './link-show.component.css',
})
export class LinkShowComponent {
    readonly href: InputSignal<string | null> = input<string | null>(null);
    readonly entity: InputSignal<SluggerEntity | null> = input<SluggerEntity | null>(null);
    computedHref = computed(() => {
        return this.href() ?? (this.entity() ? `/${this.entity()!.type}/${this.entity()!.slug}` : '#');
    });
}
