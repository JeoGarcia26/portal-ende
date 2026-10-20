import { Injectable, computed } from '@angular/core';
import { persistedSignal, novoId } from '../utils/persisted-signal';
import { Declaracao, DeclaracaoTipo, User } from '../../models';
import { MOCK_DECLARACOES } from '../../shared/data/mock-culture';
import { NotificationsService } from './notifications.service';
import { UsersService } from './users.service';

export async function sha256(texto: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
}

/** O que é selado pela assinatura: texto + código + assinante + data. Mudar qualquer um invalida o hash. */
export const conteudoSelado = (d: Declaracao) =>
  [d.codigo, d.texto, d.assinatura?.assinanteNome, d.assinatura?.assinanteCargo, d.assinatura?.data].join('|');

export function textoDeclaracao(tipo: DeclaracaoTipo, u: User, finalidade: string): string {
  const admissao = u.dataAdmissao ? new Date(u.dataAdmissao).toLocaleDateString('pt-AO') : '—';
  const base = `Para os devidos efeitos, declara-se que ${u.nome}, titular do número mecanográfico ${u.numeroMecanografico}, é colaborador(a) da ENDE — Empresa Nacional de Distribuição de Electricidade, E.P., desde ${admissao}, exercendo actualmente a função de ${u.cargo} no departamento de ${u.departamento.nome}`;
  const extra: Record<DeclaracaoTipo, string> = {
    serviço: '.',
    efectividade: ', encontrando-se em efectividade de funções à data da presente declaração.',
    rendimentos: ', auferindo a remuneração constante do respectivo processo individual, que se encontra à disposição da entidade requerente mediante pedido formal.',
  };
  return `${base}${extra[tipo]} A presente declaração destina-se a: ${finalidade}.`;
}

/**
 * Pedido e emissão de declarações com assinatura digital.
 * shortcut: a "assinatura" é um selo SHA-256 + código de verificação, calculado no browser. Prova
 * integridade (qualquer alteração ao texto é detectada) mas não autoria — a assinatura com valor
 * legal exige certificado qualificado no servidor (ex.: PAdES no PDF). Trocar quando houver backend:
 * POST /declaracoes/:id/assinar devolve o PDF assinado e GET /declaracoes/verificar/:codigo valida.
 */
@Injectable({ providedIn: 'root' })
export class DeclarationsService {
  private readonly itemsSignal = persistedSignal<Declaracao[]>('declaracoes', [...MOCK_DECLARACOES]);

  readonly items = computed(() => [...this.itemsSignal()].sort((a, b) => +new Date(b.dataPedido) - +new Date(a.dataPedido)));
  readonly pendentes = computed(() => this.items().filter((d) => d.estado === 'pendente'));

  constructor(
    private readonly users: UsersService,
    private readonly notifications: NotificationsService
  ) {}

  doUtilizador(userId: string) {
    return this.items().filter((d) => d.solicitanteId === userId);
  }

  pedir(tipo: DeclaracaoTipo, finalidade: string, solicitanteId: string): void {
    const codigo = 'ENDE-DEC-' + Array.from(crypto.getRandomValues(new Uint8Array(3)), (b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    this.itemsSignal.update((l) => [
      { id: novoId('dc'), codigo, tipo, finalidade, solicitanteId, dataPedido: new Date().toISOString(), estado: 'pendente' },
      ...l,
    ]);
  }

  async assinar(id: string, assinante: User): Promise<void> {
    const d = this.itemsSignal().find((x) => x.id === id);
    const solicitante = this.users.byId(d?.solicitanteId);
    if (!d || !solicitante || d.estado !== 'pendente') return;
    const assinada: Declaracao = {
      ...d,
      estado: 'assinada',
      texto: textoDeclaracao(d.tipo, solicitante, d.finalidade),
      assinatura: { assinanteNome: assinante.nome, assinanteCargo: assinante.cargo, data: new Date().toISOString(), hash: '' },
    };
    assinada.assinatura!.hash = await sha256(conteudoSelado(assinada));
    this.itemsSignal.update((l) => l.map((x) => (x.id === id ? assinada : x)));
    this.notifications.notificar({ titulo: 'Declaração assinada', mensagem: `A sua declaração ${d.codigo} está pronta.`, tipo: 'declaracao', link: '/declaracoes' });
  }

  recusar(id: string): void {
    this.itemsSignal.update((l) => l.map((x) => (x.id === id ? { ...x, estado: 'recusada' } : x)));
  }

  /** Verifica um código: existe, está assinado e o selo corresponde ao conteúdo. */
  async verificar(codigo: string): Promise<{ valida: boolean; declaracao?: Declaracao }> {
    const d = this.itemsSignal().find((x) => x.codigo === codigo.trim().toUpperCase());
    if (!d?.assinatura) return { valida: false, declaracao: d };
    return { valida: (await sha256(conteudoSelado(d))) === d.assinatura.hash, declaracao: d };
  }
}
