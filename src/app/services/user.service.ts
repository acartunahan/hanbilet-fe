import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5232/api/user';

  constructor(private http: HttpClient) {}

  getUser(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}`, userData);
  }

  changePassword(userId: number, passwords: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}/change-password`, passwords);
  }
}
