import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AuthenticatedLayoutComponent } from './app/pages/authentication/authenticated-layout/authenticated-layout.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  
  bootstrapApplication(AuthenticatedLayoutComponent, {
    providers: [provideHttpClient(withFetch())],
  }).catch(err => console.error(err));