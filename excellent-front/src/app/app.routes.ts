import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Clients } from './pages/clients/clients';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { Orders } from './pages/orders/orders';
import { Products } from './pages/products/products';

export const routes: Routes = [
    { path: 'login', component: Login },
    {
        path: '',
        component: Dashboard,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'clients', pathMatch: 'full' },
            { path: 'clients', component: Clients },
            { path: 'products', component: Products },
            { path: 'orders', component: Orders }
        ]
    }
];
