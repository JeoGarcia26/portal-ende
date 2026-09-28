import { Injectable, computed, signal } from '@angular/core';
import { NewsArticle } from '../../models';
import { MOCK_NEWS } from '../../shared/data/mock-news';

/**
 * TODO(backend): substituir o array em memória por HttpClient
 * (GET/POST/PUT/DELETE /api/noticias) mantendo a mesma assinatura pública.
 */
@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly itemsSignal = signal<NewsArticle[]>([...MOCK_NEWS]);

  readonly items = computed(() =>
    [...this.itemsSignal()].sort((a, b) => +new Date(b.dataPublicacao) - +new Date(a.dataPublicacao))
  );
  readonly destaques = computed(() => this.items().filter((n) => n.destaque));

  byId(id: string) {
    return computed(() => this.itemsSignal().find((n) => n.id === id));
  }

  create(item: Omit<NewsArticle, 'id'>): void {
    const id = 'n-' + Math.random().toString(36).slice(2, 8);
    this.itemsSignal.update((list) => [{ ...item, id }, ...list]);
  }

  update(id: string, changes: Partial<NewsArticle>): void {
    this.itemsSignal.update((list) => list.map((n) => (n.id === id ? { ...n, ...changes } : n)));
  }

  remove(id: string): void {
    this.itemsSignal.update((list) => list.filter((n) => n.id !== id));
  }
}
