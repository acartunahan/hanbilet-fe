import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5232/api/auth';

  // Kullanıcı login durumunu takip eden değişken
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, userData);
  }

  // Kullanıcı ID'sini kaydet ve login durumunu güncelle
  setLoginStatus(userId: number | null): void {
    if (userId !== null) {
      localStorage.setItem('userId', userId.toString());
      this.isLoggedInSubject.next(true);
    } else {
      localStorage.removeItem('userId');
      this.isLoggedInSubject.next(false);
    }
  }

  checkLoginStatus(): boolean {
    return !!localStorage.getItem('userId');
  }
}
