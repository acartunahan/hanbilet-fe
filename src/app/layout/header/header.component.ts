import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [CommonModule, RouterModule],
  standalone: true
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // 🔥 İlk yüklemede giriş durumunu kontrol et
    this.isLoggedIn = this.authService.checkLoginStatus();

    // 🔥 Kullanıcının giriş durumunu CANLI takip et
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  logout(): void {
    this.authService.setLoginStatus(null);  

    this.router.navigate(['/login']);
  }
}
