import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserPanelComponent } from './pages/user-panel/user-panel.component';
import { SeferAramaComponent } from './components/sefer-arama/sefer-arama.component';
import { SeferEkleComponent } from './components/sefer-ekle/sefer-ekle.component';
import { BiletSatinAlComponent } from './components/bilet-satin-al/bilet-satin-al.component';
import { KoltukSecComponent } from './components/koltuk-sec/koltuk-sec.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AdminGuard } from './guards/admin.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { SeferSilComponent } from './components/sefer-sil/sefer-sil.component';
import { UyeSilComponent } from './components/uye-sil/uye-sil.component';
import { AyarlarComponent } from './pages/ayarlar/ayarlar.component';
import { BiletlerimComponent } from './pages/biletlerim/biletlerim.component';
import { YardimComponent } from './pages/yardim/yardim.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'ayarlar', component: AyarlarComponent },
  { path: 'biletlerim', component: BiletlerimComponent },
  { path: 'yardim', component: YardimComponent },
  { path: 'sefer-arama', component: SeferAramaComponent },
  { path: 'koltuk-sec/:seferId', component: KoltukSecComponent },
  { path: 'sefer-ekle', component: SeferEkleComponent },  
  { path: 'bilet-satin-al/:seferId', component: BiletSatinAlComponent },
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AdminGuard] },
  { path: 'sefer-ekle', component: SeferEkleComponent, canActivate: [AdminGuard] },
  { path: 'uye-sil', component: UyeSilComponent, canActivate: [AdminGuard] },
  { path: 'sefer-sil', component: SeferSilComponent, canActivate: [AdminGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', redirectTo: '/sefer-arama', pathMatch: 'full' }
];
