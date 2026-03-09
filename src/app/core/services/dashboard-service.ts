import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DashboardResponse, UserProjection} from '../models/DashboardResponse';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
  }
  getUserProjection(): Observable<UserProjection>{
    return this.http.get<UserProjection>(`${this.baseUrl}/api/v1/user`);
  }
  getCardProjection(): Observable<DashboardResponse>{
    return this.http.get<DashboardResponse>(`${this.baseUrl}/api/v1/dashboard`);
  }
}
