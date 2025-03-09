import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Servisin global olarak kullanılmasını sağlar
})
export class TicketService {
  private biletlerGuncellendi = new Subject<void>();

  // Biletleri güncellemesi gerektiğini bildir
  biletlerGuncelle() {
    this.biletlerGuncellendi.next();
  }

  // Bileti dinleyen bileşenleri bilgilendir
  biletlerGuncelleListener() {
    return this.biletlerGuncellendi.asObservable();
  }
}
