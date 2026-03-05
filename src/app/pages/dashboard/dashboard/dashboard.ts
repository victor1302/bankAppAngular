import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import {ThemeService} from '../../../core/services/theme-service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  readonly lightTheme = "light";
  readonly blackTheme = "black";
  sidebarOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService
  ) {}
  //service to change theme
  onToggleTheme(): void{
    this.themeService.toggle(this.lightTheme, this.blackTheme);
  }
  isAltTheme(): boolean{
    return this.themeService.getTheme() === this.blackTheme;
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
