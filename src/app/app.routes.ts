import { Routes } from '@angular/router';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
          {
            path: '',
            redirectTo: 'slots',
            pathMatch: 'full'
          },
          {
            path: 'sport',
            loadChildren: () => import('./pages/sport/sport.routes').then(r => r.SPORT_ROUTES)
          },
          {
            path: 'live',
            loadChildren: () => import('./pages/live/live.routes').then(r => r.LIVE_ROUTES)
          },
          {
            path: 'slots',
            loadChildren: () => import('./pages/slots/slots.routes').then(r => r.SLOTS_ROUTES)
          },
          {
            path: 'casino',
            loadChildren: () => import('./pages/casino/casino.routes').then(r => r.CASINO_ROUTES)
          }
        ]
       
    }
];
