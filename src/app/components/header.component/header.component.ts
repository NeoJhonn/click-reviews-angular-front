import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material.module-module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  filters = new FormControl('');

  filterList: string[] = ['Destaque', 'SmartPhones', 'Games', 'Acessórios', 'Beleza'];


  private snackBar = inject(MatSnackBar);

  sharePage(): void {
    const shareData = {
      title: document.title,
      text: document.title,
      url: window.location.href,
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
