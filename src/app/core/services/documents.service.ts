import { Injectable, computed, signal } from '@angular/core';
import { CompanyDocument } from '../../models';
import { MOCK_DOCUMENTS } from '../../shared/data/mock-documents';

/** TODO(backend): substituir por HttpClient — /api/documentos */
@Injectable({ providedIn: 'root' })
export class DocumentsService {
  private readonly itemsSignal = signal<CompanyDocument[]>([...MOCK_DOCUMENTS]);

  readonly items = computed(() => this.itemsSignal());

  create(item: Omit<CompanyDocument, 'id'>): void {
    const id = 'd-' + Math.random().toString(36).slice(2, 8);
    this.itemsSignal.update((list) => [{ ...item, id }, ...list]);
  }

  remove(id: string): void {
    this.itemsSignal.update((list) => list.filter((d) => d.id !== id));
  }
}
