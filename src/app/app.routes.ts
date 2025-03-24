import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard, noAuthGuard } from './guards/auth/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { MusicListComponent } from './pages/music-list/music-list.component';
import { MusicDetailComponent } from './pages/music-detail/music-detail.component';
import { MusicEditComponent } from './pages/music-edit/music-edit.component';
import { MusicCreateComponent } from './pages/music-create/music-create.component';
import { PlaylistShowComponent } from './pages/playlist-show/playlist-show.component';
import { AlbumShowComponent } from './pages/album-show/album-show.component';
import { SearchComponent } from './pages/search/search.component';
import { LikedLibraryComponent } from './pages/liked-library/liked-library.component';
import { UploadSongComponent } from './pages/upload-song/upload-song.component';
import { PlaylistCreateComponent } from './pages/playlist-create/playlist-create.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [authGuard],
    },
    { path: 'login', component: LoginComponent },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [noAuthGuard],
    },
    {
        path: 'music',
        children: [
            // { path: '', redirectTo: '/list' },
            { path: 'list', component: MusicListComponent },
            { path: 'create', component: MusicCreateComponent },
            { path: ':slug', component: MusicDetailComponent },
            { path: 'edit/:slug', component: MusicEditComponent },
        ],
    },
    {
        path: 'playlist',
        children: [
            { path: ':slug', component: PlaylistShowComponent },
            { path: 'create', component: PlaylistCreateComponent },
        ],
    },
    {
        path: 'album',
        children: [{ path: ':slug', component: AlbumShowComponent }],
    },
    {
        path: 'search',
        children: [{ path: ':search', component: SearchComponent }],
    },
    {
        path: 'library',
        component: LikedLibraryComponent,
    },
    {
        path: 'upload',
        children: [{ path: ':slug', component: UploadSongComponent }],
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
        canActivate: [authGuard],
    },
    { path: '**', redirectTo: 'not-found' },
];
