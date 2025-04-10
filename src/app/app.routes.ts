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
import { ArtistShowComponent } from './pages/artist-show/artist-show.component';
import { SongsLikedComponent } from './pages/songs-liked/songs-liked.component';
import { NewContibutorComponent } from './pages/new-contibutor/new-contibutor.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [noAuthGuard],
    },
    {
        path: 'song',
        canActivate: [authGuard],
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
        canActivate: [authGuard],
        children: [{ path: ':slug', component: PlaylistShowComponent }],
    },
    {
        path: 'album',
        canActivate: [authGuard],
        children: [{ path: ':slug', component: AlbumShowComponent }],
    },
    {
        path: 'artist',
        canActivate: [authGuard],
        children: [{ path: ':slug', component: ArtistShowComponent }],
    },
    {
        path: 'search',
        canActivate: [authGuard],
        children: [{ path: ':search', component: SearchComponent }],
    },
    {
        path: 'library',
        canActivate: [authGuard],
        children: [
            { path: '', component: LikedLibraryComponent },
            { path: 'songs', component: SongsLikedComponent },
        ],
    },
    {
        path: 'upload',
        canActivate: [authGuard],
        children: [{ path: ':slug', component: UploadSongComponent }],
    },
    {
        path: 'shared',
        canActivate: [authGuard],
        children: [{ path: ':slug', component: NewContibutorComponent }],
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
        canActivate: [authGuard],
    },
    { path: '**', redirectTo: 'not-found' },
];
