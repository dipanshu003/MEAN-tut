import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'post-create',
    pathMatch: 'full',
  },
  {
    path: 'post-create',
    loadComponent: () =>
      import('./posts/post-create/post-create/post-create.component').then(
        (m) => m.PostCreateComponent
      ),
  },
];
