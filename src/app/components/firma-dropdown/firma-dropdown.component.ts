import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-firma-dropdown',
  template: `
    <select (change)="onFirmaChange($event)" class="form-control">
      <option value="" disabled selected>Firma Seç</option>
      <option *ngFor="let firma of firmalar" [value]="firma.id">
        {{ firma.firmaAdi }}
      </option>
    </select>
  `
  ,
  imports: [CommonModule]
})
export class FirmaDropdownComponent implements OnInit {
  firmalar: any[] = []; 
  @Output() firmaSecildi = new EventEmitter<number>(); 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getFirmalar();
  }

  getFirmalar() {
    this.http.get<any[]>('http://localhost:5232/api/firmalar').subscribe({
      next: (data) => {
        this.firmalar = data;
      },
      error: (error) => {
        console.error("Firmaları çekerken hata oluştu:", error);
      }
    });
  }

  onFirmaChange(event: Event) {
    const selectedFirmaId = Number((event.target as HTMLSelectElement).value);
    this.firmaSecildi.emit(selectedFirmaId); 
  }
}
