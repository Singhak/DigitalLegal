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
            { path: 'client/cases', loadComponent: () => import('./pages/client-portal/client-cases/client-cases').then(m => m.ClientCases) },
            { path: 'advocate/dashboard', loadComponent: () => import('./pages/advocate/advocate-dashboard/advocate-dashboard').then(m => m.AdvocateDashboard) }, // For you
            { path: 'advocate/cases', loadComponent: () => import('./pages/advocate/advocate-cases/advocate-cases').then(m => m.AdvocateCases) },
            { path: 'advocate/billing', loadComponent: () => import('./pages/advocate/advocate-billing/advocate-billing').then(m => m.AdvocateBilling) },

            // Add more internal routes here
        ]
    }
];
