import { Routes } from '@angular/router';
import {Login} from './pages/auth/login/login';
import {Register} from './pages/auth/register/register';
import {AuthGuard} from './core/guards/AuthGuard';
import {Dashboard} from './pages/dashboard/dashboard/dashboard';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: 'full'
  },
  {
    path: "login",
    component: Login
  },
  {
    path: "home",
    component: Dashboard,
    canActivate: [AuthGuard],
  },
  {
    path:"register",
    component: Register
  }
];
