import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-koltuk-sec',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './koltuk-sec.component.html',
  styleUrls: ['./koltuk-sec.component.css']
})
export class KoltukSecComponent implements OnInit {
  seferId!: number;
  koltuklar: { 
    numara: number; 
    dolu: boolean; 
    userId?: number | null;  
    cinsiyet?: string | null; 
  }[] = [];
  
  selectedKoltuk: number | null = null;
  userId = Number(localStorage.getItem('userId')); 

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cd: ChangeDetectorRef, 
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.seferId = Number(this.route.snapshot.paramMap.get('seferId'));
    this.getKoltuklar();
  }

  getKoltuklar() {
    const url = `http://localhost:5232/api/koltuklar/${this.seferId}`;
  
    this.http.get<{ id: number, seferId: number, koltukNumarasi: number, dolu: boolean, userId?: number, cinsiyet?: string }[]>(url)
      .subscribe({
        next: (data) => {
          this.koltuklar = data.map(koltuk => ({
            numara: koltuk.koltukNumarasi,
            dolu: koltuk.dolu,
            userId: koltuk.userId || null,
            cinsiyet: koltuk.cinsiyet || null 
          }));
        },
        error: (error) => {
          console.error("Koltukları çekerken hata oluştu:", error);
        }
      });
  }
  
  

  selectKoltuk(numara: number) {
    const seciliKoltuk = this.koltuklar.find(k => k.numara === numara);
    if (seciliKoltuk && !seciliKoltuk.dolu) {
      this.selectedKoltuk = numara;
    }
  }

  satinAl() {
    if (this.selectedKoltuk === null) {
      alert("Lütfen bir koltuk seçin!");
      return;
    }
  
    const userId = Number(localStorage.getItem('userId'));
    const userCinsiyet = localStorage.getItem('userCinsiyet');
  
    if (!userId || !userCinsiyet) {
      alert("Kullanıcı bilgileri eksik! Lütfen tekrar giriş yapın.");
      return;
    }
  
    const bilet = {
      seferId: this.seferId,
      userId: userId,
      koltukNumarasi: this.selectedKoltuk
    };
  
    this.http.post('http://localhost:5232/api/koltuklar/satin-al', bilet).subscribe({
      next: (response: any) => {
        alert("Bilet satın alındı!");
  

        const selectedSeat = this.koltuklar.find(k => k.numara === this.selectedKoltuk);
        if (selectedSeat) {
          selectedSeat.dolu = true;
          selectedSeat.userId = userId;
          selectedSeat.cinsiyet = userCinsiyet; 
        }
  
        this.selectedKoltuk = null;
        this.cd.detectChanges();
      },
      error: (error) => {
        alert("Bilet satın alınamadı: " + error.error);
      }
    });
  }
  
  
}
