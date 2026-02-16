import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [

  { path: '', renderMode: RenderMode.Prerender },
  { path: 'home', renderMode: RenderMode.Prerender },
  { path: 'cart', renderMode: RenderMode.Prerender },
  { path: 'brand', renderMode: RenderMode.Prerender },
  { path: 'product', renderMode: RenderMode.Prerender },
  { path: 'Categries', renderMode: RenderMode.Prerender },


  { path: 'checkout/:id', renderMode: RenderMode.Server },
  { path: 'details/:slug/:id', renderMode: RenderMode.Server },

  // Fallback
  { path: '**', renderMode: RenderMode.Server }
];
