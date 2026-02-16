import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [

  // Static Pages
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'home',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'cart',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'brand',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'product',
    renderMode: RenderMode.Prerender
  },

  // Dynamic Pages
  {
    path: 'details/:slug/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Server
  },

  // fallback
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
