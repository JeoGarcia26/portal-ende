import { Injectable, computed } from '@angular/core';
import { persistedSignal, novoId } from '../utils/persisted-signal';
import { RespostaSatisfacao } from '../../models';
import { MOCK_SATISFACAO } from '../../shared/data/mock-culture';

/** TODO(backend): POST/GET /satisfacao */
@Injectable({ providedIn: 'root' })
export class SatisfactionService {
  private readonly respostasSignal = persistedSignal<RespostaSatisfacao[]>('satisfacao', [...MOCK_SATISFACAO]);

  readonly respostas = computed(() => [...this.respostasSignal()].sort((a, b) => +new Date(b.data) - +new Date(a.data)));
  readonly media = computed(() => {
    const r = this.respostasSignal();
    return r.length ? Math.round((r.reduce((s, x) => s + x.nota, 0) / r.length) * 10) / 10 : 0;
  });
  /** Contagem por nota, de 5 a 1. */
  readonly distribuicao = computed(() =>
    [5, 4, 3, 2, 1].map((nota) => ({ nota, total: this.respostasSignal().filter((r) => r.nota === nota).length }))
  );
  /** % de respostas com nota 4 ou 5. */
  readonly satisfeitos = computed(() => {
    const r = this.respostasSignal();
    return r.length ? Math.round((r.filter((x) => x.nota >= 4).length / r.length) * 100) : 0;
  });

  jaRespondeuHoje(userId: string): boolean {
    const hoje = new Date().toDateString();
    return this.respostasSignal().some((r) => r.userId === userId && new Date(r.data).toDateString() === hoje);
  }

  responder(r: Omit<RespostaSatisfacao, 'id' | 'data'>): void {
    this.respostasSignal.update((list) => [{ ...r, id: novoId('s'), data: new Date().toISOString() }, ...list]);
  }
}
