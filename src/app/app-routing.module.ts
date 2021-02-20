import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainNavComponent } from './modules/shared/main-nav/main-nav.component';
import { CurrentUserGuard } from './guards/current-user.guard';

const routes: Routes = [
  {   
    path: '',
    canActivate: [
      CurrentUserGuard
    ],
    component: MainNavComponent,
    children: [
      {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
      },
      {
        path: 'main',
        loadChildren: 
          () => import('./modules/main/main.module').then(m => m.MainModule)
      },
      {
        path: 'statistics',
        loadChildren: 
          () => import('./modules/statistics/statistics.module').then(m => m.StatisticsModule)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren:
      () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
