import { Routes } from '@angular/router';
import { NotFoundComponent } from './main/notfound/notfound';

export const routes: Routes = [
    { path: '', redirectTo: '/houses', pathMatch: 'full' },
    { path: 'houses', loadComponent: () => import('./main/houses/houses.component') },
    {
        path: 'bnk',
        loadComponent: () => import('./main/balasAndKarakatvas/balasAndKarakatvas.component'),
    },
    { path: 'pairing', loadComponent: () => import('./main/pairMatching/pairMatching.component') },
    { path: '**', component: NotFoundComponent },
];
