import { Routes } from '@angular/router';
import {Login} from './pages/auth/login/login';
import {Register} from './pages/auth/register/register';
import {Home} from './pages/home/home';
import {AuthGuard} from './core/guards/AuthGuard';

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
    component: Home,
    canActivate: [AuthGuard],
  },
  {
    path:"register",
    component: Register
  }
];
