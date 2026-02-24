import { Routes } from '@angular/router';
import LoginComponent from './pages/login/login';
import { LayoutComponent } from './core/layout/layout';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'client/dashboard', loadComponent: () => import('./pages/client-portal/client-dashboard/client-dashboard').then(m => m.ClientDashboard) },
            { path: 'advocate/dashboard', loadComponent: () => import('./pages/advocate/advocate-dashboard/advocate-dashboard').then(m => m.AdvocateDashboard) }, // For you

            // Add more internal routes here
        ]
    }
];
