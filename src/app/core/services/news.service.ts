import { Injectable, computed } from '@angular/core';
import { persistedSignal, novoId } from '../utils/persisted-signal';
import { NewsArticle } from '../../models';
import { MOCK_NEWS } from '../../shared/data/mock-news';
import { NotificationsService } from './notifications.service';

/**
 * RF1: todas as notícias são guardadas automaticamente (persistedSignal) e nunca apagadas —
 * "remover" apenas arquiva. Não há limite de quantidade.
 * TODO(backend): substituir o array por HttpClient (GET/POST/PUT /api/noticias) mantendo a assinatura.
 */
@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly itemsSignal = persistedSignal<NewsArticle[]>('noticias', [...MOCK_NEWS]);

  private readonly todas = computed(() =>
    [...this.itemsSignal()].sort((a, b) => +new Date(b.dataPublicacao) - +new Date(a.dataPublicacao))
  );
  readonly items = computed(() => this.todas().filter((n) => !n.arquivada));
  readonly arquivadas = computed(() => this.todas().filter((n) => n.arquivada));
  readonly destaques = computed(() => this.items().filter((n) => n.destaque));

  constructor(private readonly notifications: NotificationsService) {}

  byId(id: string) {
    return computed(() => this.itemsSignal().find((n) => n.id === id));
  }

  create(item: Omit<NewsArticle, 'id'>): void {
    const id = novoId('n');
    this.itemsSignal.update((list) => [{ ...item, id }, ...list]);
    this.notifications.notificar({ titulo: 'Nova notícia', mensagem: item.titulo, tipo: 'noticia', link: '/noticias/' + id });
  }

  update(id: string, changes: Partial<NewsArticle>): void {
    this.itemsSignal.update((list) => list.map((n) => (n.id === id ? { ...n, ...changes } : n)));
  }

  arquivar(id: string): void {
    this.update(id, { arquivada: true });
  }

  restaurar(id: string): void {
    this.update(id, { arquivada: false });
  }
}
