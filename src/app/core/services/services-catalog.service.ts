import { Injectable, computed, signal } from '@angular/core';
import { ServiceItem } from '../../models';
import { MOCK_SERVICES } from '../../shared/data/mock-services';

/** TODO(backend): substituir por HttpClient — /api/servicos */
@Injectable({ providedIn: 'root' })
export class ServicesCatalogService {
  private readonly itemsSignal = signal<ServiceItem[]>([...MOCK_SERVICES]);

  readonly items = computed(() => this.itemsSignal());
  readonly populares = computed(() => this.itemsSignal().filter((s) => s.popular));

  create(item: Omit<ServiceItem, 'id'>): void {
    const id = 's-' + Math.random().toString(36).slice(2, 8);
    this.itemsSignal.update((list) => [...list, { ...item, id }]);
  }

  update(id: string, changes: Partial<ServiceItem>): void {
    this.itemsSignal.update((list) => list.map((s) => (s.id === id ? { ...s, ...changes } : s)));
  }

  remove(id: string): void {
    this.itemsSignal.update((list) => list.filter((s) => s.id !== id));
  }
}
