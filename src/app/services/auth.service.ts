import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5232/api/user';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private userRoleSubject = new BehaviorSubject<string>(this.getUserRole());
  private userIdSubject = new BehaviorSubject<number | null>(this.getUserId());

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  userRole$ = this.userRoleSubject.asObservable();
  userId$ = this.userIdSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  login(userData: { email: string, password: string }): Observable<any> {
    console.log("API'ye login isteği gönderiliyor:", userData);
    
    return this.http.post(`${this.baseUrl}/login`, userData).pipe(
      tap((response: any) => {
        console.log("API Yanıtı (login):", response);
        this.setLoginStatus(response.userId, response.role, response.cinsiyet); // ✅ Cinsiyet bilgisini de kaydet
      }),
      catchError(error => {
        console.error("Login API Hatası:", error);
        throw error;
      })
    );
    
    
  }

  setLoginStatus(userId: number | null, role: string = 'User', cinsiyet: string | null = null): void {
    if (userId !== null) {
      localStorage.setItem('userId', userId.toString());
      localStorage.setItem('userRole', role);
      
      if (cinsiyet) {
        localStorage.setItem('userCinsiyet', cinsiyet); // ✅ Cinsiyet bilgisini kaydet
      }

      this.isLoggedInSubject.next(true);
      this.userRoleSubject.next(role);
      this.userIdSubject.next(userId);
    } else {
      this.logout();
    }
}



logout(): void {
  localStorage.removeItem('userId');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userCinsiyet'); // ✅ Cinsiyet bilgisini de temizle

  this.isLoggedInSubject.next(false);
  this.userRoleSubject.next('');
  this.userIdSubject.next(null);
}


  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? +userId : null; // String'i number'a çevir
  }

  getUserRole(): string {
    return localStorage.getItem('userRole') || 'User'; // Varsayılan olarak "User" döndür
  }

  getUserCinsiyet(): string | null {
    return localStorage.getItem('userCinsiyet');
}


  checkLoginStatus(): boolean {
    return !!localStorage.getItem('userId'); // Kullanıcı ID varsa true döndür
  }
}