import { Injectable, computed, signal } from '@angular/core';
import { FaqItem, SupportTicket } from '../../models';
import { MOCK_FAQS } from '../../shared/data/mock-faqs';
import { MOCK_TICKETS } from '../../shared/data/mock-tickets';

/** TODO(backend): substituir por HttpClient — /api/suporte/tickets e /api/suporte/faq */
@Injectable({ providedIn: 'root' })
export class SupportService {
  private readonly ticketsSignal = signal<SupportTicket[]>([...MOCK_TICKETS]);
  private readonly faqsSignal = signal<FaqItem[]>([...MOCK_FAQS]);

  readonly tickets = computed(() =>
    [...this.ticketsSignal()].sort((a, b) => +new Date(b.dataAbertura) - +new Date(a.dataAbertura))
  );
  readonly faqs = computed(() => this.faqsSignal());

  abrirTicket(input: Pick<SupportTicket, 'assunto' | 'descricao' | 'categoria' | 'prioridade' | 'solicitanteId'>): void {
    const seq = this.ticketsSignal().length + 143;
    const now = new Date().toISOString();
    const novo: SupportTicket = {
      id: 't-' + Math.random().toString(36).slice(2, 8),
      numero: `TCK-2026-${String(seq).padStart(4, '0')}`,
      estado: 'aberto',
      dataAbertura: now,
      dataAtualizacao: now,
      ...input,
    };
    this.ticketsSignal.update((list) => [novo, ...list]);
  }

  atualizarEstado(id: string, estado: SupportTicket['estado']): void {
    this.ticketsSignal.update((list) =>
      list.map((t) => (t.id === id ? { ...t, estado, dataAtualizacao: new Date().toISOString() } : t))
    );
  }
}
