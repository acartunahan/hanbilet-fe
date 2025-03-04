import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SehirDropdownComponent } from '../sehir-dropdown/sehir-dropdown.component';
import { FirmaDropdownComponent } from '../firma-dropdown/firma-dropdown.component';

@Component({
  selector: 'app-sefer-ekle',
  standalone: true,
  imports: [CommonModule, FormsModule, SehirDropdownComponent, FirmaDropdownComponent],
  templateUrl: './sefer-ekle.component.html'
})
export class SeferEkleComponent {
  kalkisSehirId: number | undefined = undefined;
  varisSehirId: number | undefined = undefined;
  tarih: string = '';
  saat: string = '';
  fiyat: number = 0;
  firmaId: number | undefined = undefined;
  otobusId: number | undefined = undefined;
  otobusler: any[] = []; // Otobüs listesi

  constructor(private http: HttpClient) {}

  // 🔥 Firma seçildiğinde sadece o firmaya ait otobüsleri yükle
  onFirmaSecildi(firmaId: number) {
    this.firmaId = firmaId;
    this.otobusId = undefined; 
    this.yukleOtobusler(firmaId);
  }

  yukleOtobusler(firmaId: number) {
    this.http.get<any[]>(`http://localhost:5232/api/otobusler/by-firma/${firmaId}`).subscribe({
      next: (data) => {
        this.otobusler = data;
      },
      error: (error) => {
        console.error("Otobüsleri çekerken hata oluştu:", error);
      }
    });
  }

  seferEkle() {
    if (!this.kalkisSehirId || !this.varisSehirId || !this.firmaId || !this.otobusId || !this.tarih || !this.saat || !this.fiyat) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    // 🔥 Saat formatını TimeSpan olarak kaydetmek için düzenle
    const saatTimeSpan = this.saat + ":00"; // Örn: "15:30:00"

    const yeniSefer = {
      kalkisSehirId: this.kalkisSehirId,
      varisSehirId: this.varisSehirId,
      tarih: this.tarih, // 📅 Tarih normal şekilde gönderilecek
      saat: saatTimeSpan, // ⏰ Saat TimeSpan formatında gönderilecek
      fiyat: this.fiyat,
      firmaId: this.firmaId,
      otobusId: this.otobusId
    };

    this.http.post('http://localhost:5232/api/seferler', yeniSefer).subscribe({
      next: () => alert('Sefer başarıyla eklendi!'),
      error: (error) => {
        console.error("Sefer eklerken hata oluştu:", error);
        alert("Sefer eklenirken hata oluştu, lütfen tüm alanları doldurduğunuzdan emin olun.");
      }
    });
  }
}
