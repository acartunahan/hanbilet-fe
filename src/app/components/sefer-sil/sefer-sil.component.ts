import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sefer-sil',
  standalone: true,
  imports:[CommonModule, FormsModule],
  templateUrl: './sefer-sil.component.html',
  styleUrls: ['./sefer-sil.component.css']
})
export class SeferSilComponent implements OnInit {
  seferler: any[] = []; // Tüm seferlerin listesi
  filteredSeferler: any[] = []; // Filtrelenmiş seferler
  selectedSefer: any = null; // Seçilen sefer
  searchKalkisSehir: string = ''; // Kalkış şehri filtresi
  searchVarisSehir: string = ''; // Varış şehri filtresi
  searchTarih: string = ''; // Tarih filtresi

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getSeferler(); // Sayfa yüklendiğinde seferleri getir
  }

  // Tüm seferleri getir
  getSeferler(): void {
    this.http.get<any[]>('http://localhost:5232/api/seferler').subscribe(
      (data) => {
        this.seferler = data;
        this.filteredSeferler = [...this.seferler]; // İlk başta tüm seferler filtrelenmiş listeye aktarılır
      },
      (error) => {
        console.error('Seferler yüklenirken hata oluştu:', error);
      }
    );
  }

  // Seferi seçme işlemi
  selectSefer(sefer: any): void {
    this.selectedSefer = sefer;
  }

  // Sefer silme işlemi
  silSefer(seferId: number): void {
    if (confirm('Bu seferi silmek istediğinizden emin misiniz?')) {
      this.http.delete(`http://localhost:5232/api/seferler/${seferId}`).subscribe(
        () => {
          alert('Sefer başarıyla silindi.');
          this.getSeferler(); // Listeyi yenile
        },
        (error) => {
          console.error('Sefer silinirken hata oluştu:', error);
        }
      );
    }
  }

  // Filtreleme işlemi
  filterSeferler(): void {
    this.filteredSeferler = this.seferler.filter((sefer) => {
      return (
        (this.searchKalkisSehir ? sefer.kalkisSehirAdi.toLowerCase().includes(this.searchKalkisSehir.toLowerCase()) : true) &&
        (this.searchVarisSehir ? sefer.varisSehirAdi.toLowerCase().includes(this.searchVarisSehir.toLowerCase()) : true) &&
        (this.searchTarih ? sefer.tarih.includes(this.searchTarih) : true)
      );
    });
  }

  // Filtreyi sıfırlama işlemi
  resetFilters(): void {
    this.searchKalkisSehir = '';
    this.searchVarisSehir = '';
    this.searchTarih = '';
    this.filterSeferler(); // Filtreyi sıfırladıktan sonra tekrar filtreleme
  }
}
