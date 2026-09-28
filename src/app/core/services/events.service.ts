import { Injectable, computed, signal } from '@angular/core';
import { CompanyEvent } from '../../models';
import { MOCK_EVENTS } from '../../shared/data/mock-events';

/** TODO(backend): substituir por HttpClient — /api/eventos */
@Injectable({ providedIn: 'root' })
export class EventsService {
  private readonly itemsSignal = signal<CompanyEvent[]>([...MOCK_EVENTS]);

  readonly items = computed(() =>
    [...this.itemsSignal()].sort((a, b) => +new Date(a.dataInicio) - +new Date(b.dataInicio))
  );
  readonly proximos = computed(() => this.items().filter((e) => +new Date(e.dataInicio) >= Date.now() - 86400000));

  create(item: Omit<CompanyEvent, 'id'>): void {
    const id = 'e-' + Math.random().toString(36).slice(2, 8);
    this.itemsSignal.update((list) => [...list, { ...item, id }]);
  }

  update(id: string, changes: Partial<CompanyEvent>): void {
    this.itemsSignal.update((list) => list.map((e) => (e.id === id ? { ...e, ...changes } : e)));
  }

  remove(id: string): void {
    this.itemsSignal.update((list) => list.filter((e) => e.id !== id));
  }
}
