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

  mostrarMenu = false;
  urlAtual = window.location.href;
  texto = 'Confira esta página incrível que encontrei:';

  compartilharWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(this.texto + ' ' + this.urlAtual)}`, '_blank');
    this.mostrarMenu = false;
  }

  compartilharFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.urlAtual)}`, '_blank');
    this.mostrarMenu = false;
  }

  compartilharTwitter() {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(this.texto)}&url=${encodeURIComponent(this.urlAtual)}`, '_blank');
    this.mostrarMenu = false;
  }

  compartilharLinkedIn() {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.urlAtual)}`, '_blank');
    this.mostrarMenu = false;
  }

  copiarLink() {
    navigator.clipboard.writeText(this.urlAtual);
    alert('Link copiado para a área de transferência!');
    this.mostrarMenu = false;
  }

}
