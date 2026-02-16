import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guard/auth-guard';
import { guestGuard } from './core/auth/guard/guest-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  // Routes for guests
  {
    path: '',
    loadComponent: () => import('./core/layouts/auth-layout/auth-layout.component')
      .then(m => m.AuthLayoutComponent),
    canActivate: [guestGuard],
    children: [
      {
        path: 'register',
        loadComponent: () => import('./core/auth/register/register.component')
          .then(m => m.RegisterComponent),
        title: 'register',
      },
      {
        path: 'login',
        loadComponent: () => import('./core/auth/login/login.component')
          .then(m => m.LoginComponent),
        title: 'login',
      },
    ],
  },

  // Routes for authenticated users
  {
    path: '',
    loadComponent: () => import('./core/layouts/main-layout/main-layout.component')
      .then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: 'home', loadComponent: () => import('./feature/home/home.component').then(m => m.HomeComponent), title: 'home' },
      { path: 'checkout/:id', loadComponent: () => import('./feature/checkout/checkout.component').then(m => m.CheckoutComponent), title: 'checkout' },
      { path: 'allorders', loadComponent: () => import('./feature/allorders/allorders.component').then(m => m.AllordersComponent), title: 'orders' },
      { path: 'cart', loadComponent: () => import('./feature/cart/cart.component').then(m => m.CartComponent), title: 'cart' },
      { path: 'details/:slug/:id', loadComponent: () => import('./feature/details/details.component').then(m => m.DetailsComponent), title: 'details' },
      { path: 'brand', loadComponent: () => import('./feature/brand/brand.component').then(m => m.BrandComponent), title: 'brand' },
      { path: 'product', loadComponent: () => import('./feature/products/products.component').then(m => m.ProductsComponent), title: 'product' },
      { path: 'categries', loadComponent: () => import('./feature/categries/categries.component').then(m => m.CategriesComponent), title: 'categories' },
      { path: 'reset-password', loadComponent: () => import('./core/auth/reset-password/reset-password/reset-password.component').then(m => m.ResetPasswordComponent), title: 'Reset Password' }
    ],
  },

  // Fallback
  {
    path: '**',
    loadComponent: () => import('./feature/notfound/notfound.component').then(m => m.NotfoundComponent),
    title: 'error',
  },
];
