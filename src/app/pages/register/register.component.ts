import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class RegisterComponent {
  user = { name: '', email: '', password: '' };
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    console.log("Register butonuna basıldı!"); // Butona basıldığını görmek için log ekle

    this.authService.register(this.user).subscribe(
      response => {
        alert("Kayıt başarılı! Giriş yapabilirsiniz.");
        this.router.navigate(['/login']);
      },
      error => {
        this.message = error.error.message || 'Kayıt başarısız!';
      }
    );
  }
}
