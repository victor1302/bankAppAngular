import { Routes } from '@angular/router';
import {Login} from './components/login/login';
import {Register} from './components/register/register';
import {Home} from './components/home/home';
import {AuthGuard} from './security/AuthGuard';

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
