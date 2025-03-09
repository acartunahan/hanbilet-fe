import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userRole: string = ''; // Kullanıcı rolünü burada saklıyoruz

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // 🔥 İlk yüklemede giriş durumunu kontrol et
    this.checkLoginStatus();

    // 🔥 Kullanıcının giriş durumunu CANLI takip et
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.userRole = localStorage.getItem('userRole') || ''; // Kullanıcı rolünü al
      }
    });
  }

  // Giriş durumunu kontrol et
  checkLoginStatus(): void {
    const userId = localStorage.getItem('userId');
    this.isLoggedIn = !!userId;  // Eğer userId varsa giriş yapılmış demek
    if (this.isLoggedIn) {
      this.userRole = localStorage.getItem('userRole') || ''; // Kullanıcı rolünü al
    }
  }

  // Çıkış yap
  logout(): void {
    this.authService.setLoginStatus(null);  // Giriş durumunu sıfırla
    localStorage.removeItem('userId');  // userId'yi localStorage'dan sil
    localStorage.removeItem('userRole');  // userRole'ü localStorage'dan sil
    this.router.navigate(['/home']);  // Çıkış yaptıktan sonra login sayfasına yönlendir
  }
}
