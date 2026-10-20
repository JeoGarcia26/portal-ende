import { Injectable, computed, signal } from '@angular/core';
import { persistedSignal, novoId } from '../utils/persisted-signal';
import { AppNotification } from '../../models';
import { MOCK_NOTIFICATIONS } from '../../shared/data/mock-notifications';

/**
 * RF2: alertas aos utilizadores — no sino do portal e, se autorizado, como notificação do sistema.
 * TODO(backend): GET /notificacoes + Web Push/SSE para chegar a TODOS os utilizadores;
 * sem backend os alertas só existem no browser de quem publicou.
 */
@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private readonly itemsSignal = persistedSignal<AppNotification[]>('notificacoes', [...MOCK_NOTIFICATIONS]);

  readonly items = computed(() =>
    [...this.itemsSignal()].sort((a, b) => +new Date(b.dataCriacao) - +new Date(a.dataCriacao))
  );
  readonly naoLidas = computed(() => this.itemsSignal().filter((n) => !n.lida));
  readonly totalNaoLidas = computed(() => this.naoLidas().length);
  readonly alertasSistema = signal(typeof Notification !== 'undefined' ? Notification.permission : 'denied');

  notificar(n: Pick<AppNotification, 'titulo' | 'mensagem' | 'tipo' | 'link'>): void {
    this.itemsSignal.update((list) => [{ ...n, id: novoId('nt'), lida: false, dataCriacao: new Date().toISOString() }, ...list]);
    if (this.alertasSistema() === 'granted') {
      new Notification(n.titulo, { body: n.mensagem, icon: '/logo-ende-red.png' });
    }
  }

  async activarAlertasSistema(): Promise<void> {
    if (typeof Notification === 'undefined') return;
    this.alertasSistema.set(await Notification.requestPermission());
  }

  marcarComoLida(id: string): void {
    this.itemsSignal.update((list) => list.map((n) => (n.id === id ? { ...n, lida: true } : n)));
  }

  marcarTodasComoLidas(): void {
    this.itemsSignal.update((list) => list.map((n) => ({ ...n, lida: true })));
  }
}
