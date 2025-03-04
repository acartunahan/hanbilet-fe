import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserPanelComponent } from './pages/user-panel/user-panel.component';
import { SeferAramaComponent } from './components/sefer-arama/sefer-arama.component';
import { SeferEkleComponent } from './components/sefer-ekle/sefer-ekle.component';
import { BiletSatinAlComponent } from './components/bilet-satin-al/bilet-satin-al.component';
import { KoltukSecComponent } from './components/koltuk-sec/koltuk-sec.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-panel', component: UserPanelComponent },
  { path: 'sefer-arama', component: SeferAramaComponent },
  { path: 'koltuk-sec/:seferId', component: KoltukSecComponent },
  { path: 'sefer-ekle', component: SeferEkleComponent },  // ✅ Sefer ekleme ekranı
  { path: 'bilet-satin-al/:seferId', component: BiletSatinAlComponent },  // ✅ Bilet satın alma ekranı
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', redirectTo: '/sefer-arama', pathMatch: 'full' }
];
