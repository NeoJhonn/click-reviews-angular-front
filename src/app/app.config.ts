import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAppInitializer, inject } from '@angular/core';
import { ProductDataLoaderService } from './services/product-data-loader.service';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAppInitializer(() => {
      const loader = inject(ProductDataLoaderService);
      return loader.loadData(); // ✅ retorna a Promise direta
    }),
  ],
};
