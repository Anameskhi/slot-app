import { Routes } from "@angular/router";
import { SlotsComponent } from "./slots.component";

export const SLOTS_ROUTES: Routes = [
    {
        path: '',
        component: SlotsComponent,
        children: [
            {
                path: '',
                redirectTo: 'slots',
                pathMatch: 'full'
              },
        
        {
            path: 'filter-slots',
            loadComponent: () => import('./slots-filter/slots-filter.component').then(a => a.SlotsFilterComponent),    }
           ]
        }

]