import { Injectable, computed } from '@angular/core';
import { persistedSignal, novoId } from '../utils/persisted-signal';
import { Criterio, DestaqueMes, DistributionCenter, MudancaCargo, User } from '../../models';
import { MOCK_CENTERS, MOCK_DESTAQUES, MOCK_MUDANCAS_CARGO } from '../../shared/data/mock-culture';
import { NotificationsService } from './notifications.service';
import { UsersService } from './users.service';

/** Nota final ponderada (0–10) de uma lista de critérios. Exportado para o teste. */
export function notaPonderada(criterios: Criterio[]): number {
  const pesoTotal = criterios.reduce((s, c) => s + c.peso, 0);
  if (!pesoTotal) return 0;
  return Math.round((criterios.reduce((s, c) => s + c.nota * c.peso, 0) / pesoTotal) * 10) / 10;
}

/**
 * Cultura corporativa: colaborador e centro do mês (com critérios), mudanças de cargo, centros.
 * TODO(backend): /reconhecimento/destaques, /reconhecimento/mudancas-cargo, /centros
 */
@Injectable({ providedIn: 'root' })
export class RecognitionService {
  private readonly destaquesSignal = persistedSignal<DestaqueMes[]>('destaques', [...MOCK_DESTAQUES]);
  private readonly mudancasSignal = persistedSignal<MudancaCargo[]>('mudancas_cargo', [...MOCK_MUDANCAS_CARGO]);

  readonly centros = computed<DistributionCenter[]>(() => MOCK_CENTERS);
  readonly destaques = computed(() => [...this.destaquesSignal()].sort((a, b) => b.mes.localeCompare(a.mes)));
  readonly colaboradorDoMes = computed(() => this.destaques().find((d) => d.tipo === 'colaborador'));
  readonly centroDoMes = computed(() => this.destaques().find((d) => d.tipo === 'centro'));
  readonly mudancas = computed(() => [...this.mudancasSignal()].sort((a, b) => +new Date(b.data) - +new Date(a.data)));

  constructor(
    private readonly users: UsersService,
    private readonly notifications: NotificationsService
  ) {}

  centro(id: string) {
    return this.centros().find((c) => c.id === id);
  }

  eleger(d: Omit<DestaqueMes, 'id'>): void {
    // um destaque por tipo e mês: eleger de novo substitui
    this.destaquesSignal.update((list) => [
      { ...d, id: novoId('dm') },
      ...list.filter((x) => !(x.tipo === d.tipo && x.mes === d.mes)),
    ]);
    const nome = d.tipo === 'colaborador' ? this.users.byId(d.referenciaId)?.nome : this.centro(d.referenciaId)?.nome;
    this.notifications.notificar({
      titulo: d.tipo === 'colaborador' ? 'Colaborador do mês' : 'Centro de distribuição do mês',
      mensagem: `Parabéns a ${nome}!`,
      tipo: 'reconhecimento',
      link: '/reconhecimento',
    });
  }

  registarMudancaCargo(userId: string, cargoNovo: string): void {
    const u = this.users.byId(userId);
    if (!u || !cargoNovo.trim() || cargoNovo === u.cargo) return;
    this.mudancasSignal.update((list) => [
      { id: novoId('mc'), userId, cargoAnterior: u.cargo, cargoNovo, data: new Date().toISOString(), felicitacoes: [] },
      ...list,
    ]);
    this.users.alterarCargo(userId, cargoNovo);
    this.notifications.notificar({
      titulo: 'Nova função',
      mensagem: `${u.nome} assume agora o cargo de ${cargoNovo}. Deixe as suas felicitações!`,
      tipo: 'reconhecimento',
      link: '/reconhecimento',
    });
  }

  felicitar(mudancaId: string, por: User): void {
    this.mudancasSignal.update((list) =>
      list.map((m) =>
        m.id === mudancaId && !m.felicitacoes.some((f) => f.userId === por.id)
          ? { ...m, felicitacoes: [...m.felicitacoes, { userId: por.id, nome: por.nome }] }
          : m
      )
    );
  }
}
