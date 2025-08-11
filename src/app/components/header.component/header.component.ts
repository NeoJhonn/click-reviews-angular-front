import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { MaterialModule } from '../../material.module-module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule, Router, NavigationEnd, UrlTree } from '@angular/router';
import { FilterService } from '../../services/filter.service';
import { filter } from 'rxjs/operators';

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
  private elementRef = inject(ElementRef);

  showFilter = false;
  private homeTree!: UrlTree; // UrlTree para a raiz "/"

  selectedCategory: string = '';
  isOpen: boolean = false;

  categories = [
    { label: 'Em destaque', value: 'destaque' },
    { label: 'Todos', value: '' },
    { label: 'SmartPhones', value: 'smartphone' },
    { label: 'Beleza', value: 'beleza' },
    { label: 'Eletroportáteis', value: 'eletroportatil' },
    { label: 'Acessórios Gamer', value: 'acessorio-gamer' },
    { label: 'Acessórios bebê', value: 'acessorio-bebe' },
    // { label: 'Jogos PS5', value: 'jogos-ps5' },
  ];

  ngOnInit(): void {
    // Sincroniza o rótulo selecionado com o service
    this.filterService.category$.subscribe((category) => {
      this.selectedCategory = category;
    });

    // Cria a UrlTree da raiz e faz o check inicial
    this.homeTree = this.router.createUrlTree(['/']);
    this.updateShowFilter();

    // Atualiza somente quando navegação termina
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.updateShowFilter());
  }

  private updateShowFilter() {
    this.showFilter = this.router.isActive(this.homeTree, {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  // 🔹 Fecha o dropdown ao clicar fora
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectCategory(value: string) {
    this.isOpen = false;
    this.filterService.setCategory(value);
  }

  getSelectedLabel(): string {
    return (
      this.categories.find((c) => c.value === this.selectedCategory)?.label ||
      'Todos'
    );
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
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          this.snackBar.open('Link copiado para a área de transferência!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        })
        .catch(() => {
          alert('Não foi possível copiar o link. Copie manualmente.');
        });
    }
  }
}
