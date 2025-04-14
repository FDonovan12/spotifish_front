import { Component, inject, input, Input, Signal, signal } from '@angular/core';
import { UploadService } from '../../services/upload/upload.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-upload-song',
    standalone: true,
    imports: [],
    templateUrl: './upload-song.component.html',
    styleUrl: './upload-song.component.css',
})
export class UploadSongComponent {
    slug: Signal<string> = input.required();

    file: File | null = null;
    private readonly uploadService: UploadService = inject(UploadService);
    private readonly router: Router = inject(Router);

    onFileSelected(event: any) {
        this.file = event.target.files[0];
    }

    upload() {
        if (!this.file) {
            alert('Veuillez sélectionner un fichier !');
            return;
        }
        this.uploadService.song(this.file, this.slug());
        this.router.navigateByUrl('song/list');
    }
}
