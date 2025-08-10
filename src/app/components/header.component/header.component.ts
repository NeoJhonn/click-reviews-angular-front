import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material.module-module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { FilterService } from '../../services/filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule, MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private snackBar = inject(MatSnackBar);
  private filterService = inject(FilterService);
  private router = inject(Router);
  showFilter = false;

  selectedCategory: string = '';
  isOpen: boolean = false;

  categories = [
    { label: 'Em destaque', value: 'destaque' },
    { label: 'Todos', value: '' },
    { label: 'Smartphones', value: 'smartphone' },
    { label: 'Beleza', value: 'beleza' },
    { label: 'Eletroportáteis', value: 'eletroportatil' },
    { label: 'Acessórios Gamer', value: 'acessorio-Gamer' },
    { label: 'Acessórios bebê', value: 'acessorio-bebe' },
    //{ label: 'Jogos PS5', value: 'Jogo PS5' },
  ];

  ngOnInit(): void {
    this.filterService.category$.subscribe((category) => {
      this.selectedCategory = category;
    });

     // Escuta as mudanças de rota
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      if ( !currentRoute.startsWith('/contato')
        || !currentRoute.startsWith('/privacidade')
        || currentRoute.startsWith('/review') != true
    ) {
        console.log("rota atual= ", currentRoute);
        this.showFilter = true;
      }
    });
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectCategory(value: string) {
    this.isOpen = false;
    this.filterService.setCategory(value);
  }

  getSelectedLabel(): string {
    return this.categories.find(c => c.value === this.selectedCategory)?.label || 'Todos';
  }

  sharePage(): void {
    const shareData = {
      title: document.title,
      text: document.title,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log('Compartilhado com sucesso!'))
        .catch((err) => console.error('Erro ao compartilhar:', err));
    } else {
      // Fallback para copiar o link no desktop
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          this.snackBar.open(
            'Link copiado para a área de transferência!',
            'Fechar',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            }
          );
        })
        .catch(() => {
          alert('Não foi possível copiar o link. Copie manualmente.');
        });
    }
  }
}
