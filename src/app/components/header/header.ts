import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  private snackBar = inject(MatSnackBar);

  sharePage(): void {
    const shareData = {
      title: document.title,
      text: document.title,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Compartilhado com sucesso!'))
        .catch(err => console.error('Erro ao compartilhar:', err));
    } else {
      // Fallback para copiar o link no desktop
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          this.snackBar.open('Link copiado para a área de transferência!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        })
        .catch(() => {
          alert('Não foi possível copiar o link. Copie manualmente.');
        });
    }
  }
}
