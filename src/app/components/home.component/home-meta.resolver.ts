// src/app/home/home-meta.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class HomeMetaResolver implements Resolve<boolean> {
  constructor(private meta: Meta, private title: Title) {}

  resolve(): boolean {
    // SEO Metadata
    this.title.setTitle(`Home | ClickReviews`);

    // Limpa tags anteriores (evita duplicação)
    this.meta.removeTag("name='description'");
    this.meta.removeTag("property='og:title'");
    this.meta.removeTag("property='og:description'");
    this.meta.removeTag("property='og:image'");
    this.meta.removeTag("property='og:url'");
    this.meta.removeTag("property='og:type'");
    this.meta.removeTag("name='twitter:card'");
    this.meta.removeTag("name='twitter:title'");
    this.meta.removeTag("name='twitter:description'");
    this.meta.removeTag("name='twitter:image'");


    this.meta.updateTag({
        property: 'og:description',
        content: 'ClickReviews, o melhor site de Reviews do Brasil!',
      });
    this.meta.updateTag({ property: 'og:url', content: 'https://clickreviews.com.br/' });

    return true;
  }
}
