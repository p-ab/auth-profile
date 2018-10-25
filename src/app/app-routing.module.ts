import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent }   from './app.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { NotificationsComponent } from './components/alerts/notifications/notifications.component';


const appRoutes: Routes = [
  {
    path: '',
    component: SignInComponent
  },
  {
    path: 'login',
    component: SignInComponent
  },
  {
    path: 'register',
    component: SignUpComponent
  },
  {
    path: 'board',
    component: DashboardComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
     exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }