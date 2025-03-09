import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
})
export class LoginComponent {
  user = { email: '', password: '' };
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

login(): void {
  console.log("Giriş butonuna basıldı, API'ye istek gönderiliyor...");

  const loginData = {
    email: this.user.email.trim(),
    password: this.user.password
  };

  this.authService.login(loginData).subscribe(
    response => {
      console.log("API Yanıtı:", response);

      if (!response || !response.userId || !response.role) {
        this.message = "Geçersiz yanıt! Kullanıcı bilgileri eksik.";
        return;
      }

      alert("Giriş başarılı!");

      // 📌 Kullanıcı bilgilerini localStorage'a kaydet
      localStorage.setItem('userId', response.userId.toString());
      localStorage.setItem('userRole', response.role);

      if (response.cinsiyet) {
        localStorage.setItem('userCinsiyet', response.cinsiyet);
      }

      this.authService.setLoginStatus(response.userId, response.role, response.cinsiyet);

      // ✅ Kullanıcı giriş yaptıysa `sefer-arama` sayfasına yönlendir
      this.router.navigate(['/sefer-arama']);
    },
    error => {
      console.error("Giriş hatası:", error);
      this.message = error.error?.message || 'Giriş başarısız! Kullanıcı adı veya şifre hatalı.';
    }
  );
}

}
