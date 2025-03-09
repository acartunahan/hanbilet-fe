import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ayarlar',
  templateUrl: './ayarlar.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]
})
export class AyarlarComponent implements OnInit {
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

  constructor(private userService: UserService, private authService: AuthService, private http: HttpClient, private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadUser();
  
    this.ticketService.biletlerGuncelleListener().subscribe(() => {
      this.loadBiletler();
    });
  }

  loadUser(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userId = +userId;
      this.userService.getUser(this.userId).subscribe(response => {
        this.user = response;
        this.loadBiletler(); 
      });
    }
  }

  loadBiletler(): void {
    if (!this.userId) return;
  
    const url = `http://localhost:5232/api/biletler/${this.userId}?timestamp=${new Date().getTime()}`;
  
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        console.log("Gelen Bilet Verisi:", data);
  
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
