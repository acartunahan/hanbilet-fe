import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sehir-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './sehir-dropdown.component.html',
})
export class SehirDropdownComponent implements OnInit {
  sehirler: any[] = [];
  selectedSehir: number | null = null;

  @Output() sehirSecildi = new EventEmitter<number | null>(); 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5232/api/sehirler').subscribe({
      next: (data) => {
        this.sehirler = data;
        console.log("Şehirler yüklendi:", this.sehirler);
      },
      error: (err) => console.error("Şehirleri çekerken hata oluştu:", err),
    });
  }

  onSehirChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedSehir = target.value ? Number(target.value) : null; 
    console.log("Seçilen şehir ID:", this.selectedSehir);
    this.sehirSecildi.emit(this.selectedSehir); 
  }
}
