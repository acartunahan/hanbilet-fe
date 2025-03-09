import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class TicketService {
  private biletlerGuncellendi = new Subject<void>();


  biletlerGuncelle() {
    this.biletlerGuncellendi.next();
  }


  biletlerGuncelleListener() {
    return this.biletlerGuncellendi.asObservable();
  }
}
