import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TableResizeService {
    public updateDisplay() {
        const width = window.innerWidth; // Récupère la largeur de l'écran

        document.querySelectorAll('[data-break-point]').forEach((el: Element) => {
            console.log('resize each');
            const breakpoint = parseInt(el.getAttribute('data-break-point') || '0', 10);
            (el as HTMLElement).style.display = width <= breakpoint ? 'none' : '';
        });
    }
}
