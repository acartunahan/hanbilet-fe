import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // ✅ Doğru import
import { provideRouter, withHashLocation } from '@angular/router';
import { FormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Standalone için HTTP Client burada ekleniyor
    provideRouter(routes, withHashLocation()),
    FormsModule // ✅ Doğru isim kullanıldı
  ]
}).catch(err => console.error(err));
