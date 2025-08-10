import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module-module';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy.component',
  imports: [
    MaterialModule,
    RouterModule
  ],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {

  constructor(private title: Title) {
    // SEO Metadata
        this.title.setTitle(`Política de Privacidade | ClickReviews`);
  }

}
