import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
})
export class RegisterComponent implements OnInit {
  user = { name: '', surname: '', email: '', phone: '', birthDay: '', birthMonth: '', birthYear: '', cinsiyet: '' , password: '', confirmPassword: '', role: '' };
  message = '';
  days: number[] = [];
  months = [
    { name: 'Ocak', value: 1 }, { name: 'Şubat', value: 2 }, { name: 'Mart', value: 3 }, { name: 'Nisan', value: 4 },
    { name: 'Mayıs', value: 5 }, { name: 'Haziran', value: 6 }, { name: 'Temmuz', value: 7 }, { name: 'Ağustos', value: 8 },
    { name: 'Eylül', value: 9 }, { name: 'Ekim', value: 10 }, { name: 'Kasım', value: 11 }, { name: 'Aralık', value: 12 }
  ];
  years: number[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.populateDays();
    this.populateYears();
  }

  populateDays() {
    this.days = Array.from({ length: 31 }, (_, i) => i + 1);
  }

  populateYears() {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  }

  calculateAge(): number {
    const today = new Date();
    const birthDate = new Date(Number(this.user.birthYear), Number(this.user.birthMonth) - 1, Number(this.user.birthDay));
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  register(): void {
    console.log("Register butonuna basıldı!");

    const age = this.calculateAge();
    if (age < 18) {
      this.showAgeWarning();
      return;
    }

    if (this.user.password !== this.user.confirmPassword) {
      this.message = "Şifreler uyuşmuyor!";
      return;
    }

    if (!this.user.cinsiyet) {
      this.message = "Lütfen cinsiyet seçin!";
      return;
    }

    const birthDate = new Date(Number(this.user.birthYear), Number(this.user.birthMonth) - 1, Number(this.user.birthDay)).toISOString().split('T')[0];

    const userPayload = {
      name: this.user.name,
      surname: this.user.surname,
      email: this.user.email,
      phone: this.user.phone,
      cinsiyet: this.user.cinsiyet, 
      birthDate: birthDate,
      password: this.user.password,
      confirmPassword: this.user.confirmPassword,
      role: this.user.role || "User"
    };

    this.authService.register(userPayload).subscribe(
      response => {
        alert("Kayıt başarılı! Giriş yapabilirsiniz.");
        this.router.navigate(['/login']);
      },
      error => {
        this.message = error.error.message || 'Kayıt başarısız!';
      }
    );
  }

  showAgeWarning() {
    const modalElement = document.getElementById('ageWarningModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
