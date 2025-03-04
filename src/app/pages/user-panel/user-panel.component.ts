import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class UserPanelComponent implements OnInit {
  user = { name: '', email: '' };
  biletler: {
    seferId: number;
    koltukNumarasi: number;
    fiyat: number;
    satinAlmaTarihi: string;
    kalkisSehir: string;
    varisSehir: string;
    tarih: string;
    saat: string;
    firmaAdi: string;
    otobusPlaka: string;
  }[] = [];
  
  
  userId!: number;

  constructor(private userService: UserService, private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userId = +userId;
      this.userService.getUser(this.userId).subscribe(response => {
        this.user = response;
        this.loadBiletler(); // Kullanıcı yüklendikten sonra biletleri getir
      });
    }
  }

  loadBiletler(): void {
    if (!this.userId) return;
  
    this.http.get<any[]>(`http://localhost:5232/api/biletler/${this.userId}`)
      .subscribe({
        next: (data) => {
          console.log("Gelen Bilet Verisi:", data); // 🔥 JSON çıktısını kontrol et
  
          this.biletler = data.map(bilet => ({
            seferId: bilet.seferId,
            koltukNumarasi: bilet.koltukNumarasi,
            fiyat: bilet.fiyat,
            satinAlmaTarihi: bilet.satinAlmaTarihi, 
            kalkisSehir: bilet.seferBilgisi.kalkisSehir,
            varisSehir: bilet.seferBilgisi.varisSehir,
            tarih: bilet.seferBilgisi.tarih,
            saat: bilet.seferBilgisi.saat,
            firmaAdi: bilet.seferBilgisi.firmaAdi,
            otobusPlaka: bilet.seferBilgisi.otobusPlaka
          }));
        },
        error: (error) => {
          console.error("Biletleri çekerken hata oluştu:", error);
        }
      });
  }
  
}
