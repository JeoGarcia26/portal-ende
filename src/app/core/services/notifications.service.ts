import { Injectable, computed, signal } from '@angular/core';
import { AppNotification } from '../../models';
import { MOCK_NOTIFICATIONS } from '../../shared/data/mock-notifications';

/**
 * TODO(backend): substituir por HttpClient (GET /notificacoes) e, idealmente,
 * um WebSocket/SSE para chegada em tempo real. A assinatura pública mantém-se.
 */
@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private readonly itemsSignal = signal<AppNotification[]>([...MOCK_NOTIFICATIONS]);

  readonly items = computed(() =>
    [...this.itemsSignal()].sort((a, b) => +new Date(b.dataCriacao) - +new Date(a.dataCriacao))
  );
  readonly naoLidas = computed(() => this.itemsSignal().filter((n) => !n.lida));
  readonly totalNaoLidas = computed(() => this.naoLidas().length);

  marcarComoLida(id: string): void {
    this.itemsSignal.update((list) => list.map((n) => (n.id === id ? { ...n, lida: true } : n)));
  }

  marcarTodasComoLidas(): void {
    this.itemsSignal.update((list) => list.map((n) => ({ ...n, lida: true })));
  }
}
