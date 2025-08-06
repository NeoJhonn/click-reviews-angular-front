import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module-module';
import { RouterModule } from '@angular/router';

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

}
