import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import {ThemeService} from '../../../core/services/theme-service';
import {CommonModule} from '@angular/common';
import {CardProjection, DashboardResponse, UserProjection} from '../../../core/models/DashboardResponse';
import {DashboardService} from '../../../core/services/dashboard-service';
import {data} from 'autoprefixer';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
  userProjection: UserProjection | null = null;
  cardProjection: CardProjection | null = null;
  cardNumber: string | null = null;
  readonly lightTheme = "light";
  readonly blackTheme = "black";
  sidebarOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService,
    private dashboardService: DashboardService
  ) {}

  //service to change theme
  onToggleTheme(): void{
    this.themeService.toggle(this.lightTheme, this.blackTheme);
  }
  isAltTheme(): boolean{
    return this.themeService.getTheme() === this.blackTheme;
  }

  ngOnInit():void{
    this.dashboardService.getUserProjection().subscribe({
      next: (data: UserProjection) => {
        this.userProjection = data;
      },
      error: (err) => console.error(err),
    });
    this.dashboardService.getCardProjection().subscribe({
      next: (data: DashboardResponse) => {
        this.cardProjection = data.cardProjection;
      },
      error: (error) => console.error(error),
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
