import { Injectable, computed, signal } from '@angular/core';
import { Announcement } from '../../models';
import { MOCK_ANNOUNCEMENTS } from '../../shared/data/mock-announcements';

/** TODO(backend): substituir por HttpClient — /api/comunicados */
@Injectable({ providedIn: 'root' })
export class AnnouncementsService {
  private readonly itemsSignal = signal<Announcement[]>([...MOCK_ANNOUNCEMENTS]);

  readonly items = computed(() =>
    [...this.itemsSignal()].sort((a, b) => {
      if (a.fixado !== b.fixado) return a.fixado ? -1 : 1;
      return +new Date(b.dataPublicacao) - +new Date(a.dataPublicacao);
    })
  );

  create(item: Omit<Announcement, 'id'>): void {
    const id = 'c-' + Math.random().toString(36).slice(2, 8);
    this.itemsSignal.update((list) => [{ ...item, id }, ...list]);
  }

  update(id: string, changes: Partial<Announcement>): void {
    this.itemsSignal.update((list) => list.map((c) => (c.id === id ? { ...c, ...changes } : c)));
  }

  remove(id: string): void {
    this.itemsSignal.update((list) => list.filter((c) => c.id !== id));
  }
}
