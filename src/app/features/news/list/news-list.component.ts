import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../../core/services/news.service';
import { AuthService } from '../../../core/services/auth.service';
import { NewsArticle, NewsCategoria } from '../../../models';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { listStagger } from '../../../shared/animations/route-animations';

const CATEGORIAS: NewsCategoria[] = ['institucional', 'operações', 'rh', 'projectos', 'comunidade'];

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IconComponent, ModalComponent],
  templateUrl: './news-list.component.html',
  animations: [listStagger],
})
export class NewsListComponent {
  readonly categorias = CATEGORIAS;
  readonly filtroCategoria = signal<NewsCategoria | 'todas'>('todas');
  readonly termo = signal('');
  readonly modalAberto = signal(false);
  readonly emEdicao = signal<NewsArticle | null>(null);

  form = this.formVazio();

  constructor(
    readonly news: NewsService,
    readonly auth: AuthService
  ) {}

  get filtradas(): NewsArticle[] {
    const cat = this.filtroCategoria();
    const termo = this.termo().toLowerCase().trim();
    return this.news.items().filter((n) => {
      const passaCategoria = cat === 'todas' || n.categoria === cat;
      const passaTermo = !termo || n.titulo.toLowerCase().includes(termo) || n.resumo.toLowerCase().includes(termo);
      return passaCategoria && passaTermo;
    });
  }

  private formVazio() {
    return {
      titulo: '',
      resumo: '',
      conteudo: '',
      imagemUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80',
      categoria: 'institucional' as NewsCategoria,
      destaque: false,
      tempoLeituraMin: 3,
    };
  }

  abrirNova(): void {
    this.emEdicao.set(null);
    this.form = this.formVazio();
    this.modalAberto.set(true);
  }

  abrirEdicao(n: NewsArticle, ev: Event): void {
    ev.preventDefault();
    ev.stopPropagation();
    this.emEdicao.set(n);
    this.form = {
      titulo: n.titulo,
      resumo: n.resumo,
      conteudo: n.conteudo,
      imagemUrl: n.imagemUrl,
      categoria: n.categoria,
      destaque: n.destaque,
      tempoLeituraMin: n.tempoLeituraMin,
    };
    this.modalAberto.set(true);
  }

  guardar(): void {
    const user = this.auth.currentUser();
    const editando = this.emEdicao();
    if (editando) {
      this.news.update(editando.id, { ...this.form });
    } else {
      this.news.create({
        ...this.form,
        autor: { id: user?.id ?? 'u-000', nome: user?.nome ?? 'Utilizador', cargo: user?.cargo },
        dataPublicacao: new Date().toISOString(),
      });
    }
    this.modalAberto.set(false);
  }

  remover(n: NewsArticle, ev: Event): void {
    ev.preventDefault();
    ev.stopPropagation();
    if (confirm(`Remover a notícia "${n.titulo}"?`)) {
      this.news.remove(n.id);
    }
  }
}
