import { HostListener, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TableResizeService {
    public updateDisplay() {
        const width = window.innerWidth;

        document.querySelectorAll('[data-break-point]').forEach((el: Element) => {
            const breakpoint = parseInt(el.getAttribute('data-break-point') || '0', 10);
            (el as HTMLElement).style.display = width <= breakpoint ? 'none' : '';
        });
    }
}
