import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';


@Component({
  selector: 'app-header',
  imports: [
    MaterialModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
