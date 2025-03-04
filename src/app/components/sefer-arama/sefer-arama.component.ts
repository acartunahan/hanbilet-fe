import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Kullanıcının giriş durumunu kontrol etmek için

@Component({
  selector: 'app-sefer-arama',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sefer-arama.component.html',
  styleUrls: ['./sefer-arama.component.css']
})
export class SeferAramaComponent {
  kalkisSehirId: number | undefined;
  varisSehirId: number | undefined;
  tarih: string = '';
  seferler: any[] = [];
  sehirler: any[] = [];
  aramaYapildi: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.getSehirler();
    this.isLoggedIn = this.authService.checkLoginStatus();
  }

  getSehirler() {
    this.http.get<any[]>('http://localhost:5232/api/sehirler').subscribe({
      next: (data) => {
        this.sehirler = data;
      },
      error: (error) => {
        console.error("Şehirleri çekerken hata oluştu:", error);
      }
    });
  }

  araSeferler() {
    if (!this.kalkisSehirId || !this.varisSehirId || !this.tarih) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    const params = { kalkisSehirId: this.kalkisSehirId, varisSehirId: this.varisSehirId, tarih: this.tarih };

    this.http.get<any[]>('http://localhost:5232/api/seferler', { params }).subscribe({
      next: (data) => {
        this.seferler = data.map(sefer => ({
          ...sefer,
          saat: sefer.saat ? sefer.saat.slice(0, 5) : "Bilinmiyor" // ⏰ Saat bilgisini HH:mm formatına çevir
        }));
        this.aramaYapildi = true;
      },
      error: (error) => {
        console.error("Sefer arama hatası:", error);
        this.aramaYapildi = true;
      }
    });
  }

  satinAl(seferId: number) {
    if (!this.isLoggedIn) {
      alert("Bilet satın almak için giriş yapmalısınız!");
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/koltuk-sec', seferId]);
  }
}
