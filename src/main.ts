import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter, withHashLocation } from '@angular/router';
import { FormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), 
    provideRouter(routes, withHashLocation()),
    FormsModule 
  ]
}).catch(err => console.error(err));
