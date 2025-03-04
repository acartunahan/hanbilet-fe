import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],  // 🔥 FormsModule ve CommonModule eklendi
})
export class LoginComponent {
  user = { email: '', password: '' };
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.user).subscribe(
      response => {
        alert("Giriş başarılı!");
        localStorage.setItem('userId', response.userId);
        
        // 🔥 loginData yerine user kullanılıyordu, gereksiz kod kaldırıldı
        this.authService.setLoginStatus(response.userId); // ✅ DOĞRU: Kullanıcı ID'sini kaydediyoruz
        
        this.router.navigate(['/sefer-arama']); // 🔥 Giriş yapan artık buraya gidiyor!
      },
      error => {
        this.message = error.error.message || 'Giriş başarısız!';
      }
    );
  }
}
