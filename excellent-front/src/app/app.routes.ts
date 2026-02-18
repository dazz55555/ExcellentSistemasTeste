import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Clients } from './pages/clients/clients';
import { CreateClient } from './pages/clients/create-client/create-client';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { CreateOrder } from './pages/orders/create-order/create-order';
import { Orders } from './pages/orders/orders';
import { ViewOrder } from './pages/orders/view-order/view-order';
import { CreateProduct } from './pages/products/create-product/create-product';
import { Products } from './pages/products/products';
import { ViewProduct } from './pages/products/view-product/view-product';

export const routes: Routes = [
    { path: 'login', component: Login },
    {
        path: '',
        component: Dashboard,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'clients', pathMatch: 'full' },
            { path: 'clients', component: Clients },
            { path: 'clients/create', component: CreateClient },
            { path: 'products', component: Products },
            { path: 'products/create', component: CreateProduct },
            { path: 'products/view/:id', component: ViewProduct },
            { path: 'orders', component: Orders },
            { path: 'orders/create', component: CreateOrder },
            { path: 'orders/view/:id', component: ViewOrder },
        ]
    }
];
