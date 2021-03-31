import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';
import { AuthGuard } from './auth/guards/auth.guard';
export const AppRoutes: Routes = [
  {
  
  path: '',
  component: AdminLayoutComponent,
  children: [
    {
      path: '',
      loadChildren: './dashboard/dashboard.module#DashboardModule',
      canActivate: [AuthGuard]
    },
    {
      path: 'profile',
      loadChildren: './profile/profile.module#ProfileModule',
      canActivate: [AuthGuard]

    
    },
    {
      path: 'daylight',
      loadChildren: './daylight/daylight.module#DaylightModule',
      canActivate: [AuthGuard]

    
    },
    {
      path: 'equipe',
      loadChildren: './equipe/equipe.module#EquipeModule',
      canActivate: [AuthGuard]

  
    },
    {
      path: 'feed',
      loadChildren: './feed/feed.module#FeedModule',
      canActivate: [AuthGuard]

  
    },
    {
      path: 'ranking',
      loadChildren: './ranking/ranking.module#RankingModule',
      canActivate: [AuthGuard]

  
    }
  
  ]
  
  

},


 {
    path: '',
    component: AuthLayoutComponent,
    children: [{
      path: 'auth',
      loadChildren: './auth/session.module#SessionModule'
  }

 ]
},


{
  path: '**',
  redirectTo: 'auth/404'
}

];
