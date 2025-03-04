import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-koltuk-sec',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './koltuk-sec.component.html',
  styleUrls: ['./koltuk-sec.component.css']
})
export class KoltukSecComponent implements OnInit {
  seferId!: number;
  koltuklar: { numara: number, dolu: boolean }[] = [];
  selectedKoltuk: number | null = null;
  userId = 1; // 📌 Kullanıcı giriş yaptığında gerçek ID ile değiştirilmeli!

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.seferId = Number(this.route.snapshot.paramMap.get('seferId'));
  
    console.log("Sefer ID:", this.seferId); // ✅ Sefer ID’yi kontrol etmek için
    this.getKoltuklar();
  }
  
  getKoltuklar() {
    const url = `http://localhost:5232/api/koltuklar/${this.seferId}`;
    console.log("API çağrısı yapılıyor:", url);
  
    this.http.get<{ id: number, seferId: number, koltukNumarasi: number, dolu: boolean }[]>(url)
      .subscribe({
        next: (data) => {
          console.log("Gelen koltuk verisi:", data);
          
          // 📌 Gelen veriyi Angular’ın beklediği formata çeviriyoruz!
          this.koltuklar = data.map(koltuk => ({
            numara: koltuk.koltukNumarasi,
            dolu: koltuk.dolu
          }));
  
          console.log("Dönüştürülmüş koltuklar:", this.koltuklar);
        },
        error: (error) => {
          console.error("Koltukları çekerken hata oluştu:", error);
        }
      });
  }
  
  
  

  selectKoltuk(numara: number) {
    if (!this.koltuklar.find(k => k.numara === numara)?.dolu) {
      this.selectedKoltuk = numara;
    }
  }

  satinAl() {
    if (this.selectedKoltuk === null) {
      alert("Lütfen bir koltuk seçin!");
      return;
    }

    const bilet = {
      seferId: this.seferId,
      userId: localStorage.getItem('userId'),  // 🔥 Kullanıcının ID'sini ekle
      koltukNumarasi: this.selectedKoltuk
    };
    
    console.log("Bilet Gönderiliyor:", bilet); // 🔥 Gönderilen veriyi kontrol et
    
    this.http.post('http://localhost:5232/api/biletler', bilet, { headers: { 'Content-Type': 'application/json' } }).subscribe({
      next: () => {
        alert("Bilet satın alındı!");
        this.getKoltuklar();
      },
      error: (error) => {
        console.error("Bilet satın alma hatası:", error); // 🔥 Hata mesajını logla
        alert("Bilet satın alınamadı: " + error.error);
      }
    });
}


  
  
  
}
