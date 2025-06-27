import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    MaterialModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
