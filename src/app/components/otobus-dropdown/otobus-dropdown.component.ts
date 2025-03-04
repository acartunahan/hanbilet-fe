import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otobus-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule], // FormsModule eklendi
  templateUrl: './otobus-dropdown.component.html'
})
export class OtobusDropdownComponent implements OnInit {
  otobusler: any[] = [];
  selectedOtobus: number | undefined = undefined;

  @Output() otobusSecildi = new EventEmitter<number>(); // Angular’a veri aktarma

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5232/api/otobusler').subscribe({
      next: (data) => {
        this.otobusler = data;
        console.log("Otobüsler yüklendi:", this.otobusler);
      },
      error: (err) => console.error("Otobüsleri çekerken hata oluştu:", err)
    });
  }

  onOtobusChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedOtobus = target.value ? Number(target.value) : undefined; // `number` olarak çeviriyoruz
    console.log("Seçilen otobüs ID:", this.selectedOtobus);
    this.otobusSecildi.emit(this.selectedOtobus); // `@Output()` ile dışarı aktarıyoruz
  }
}
