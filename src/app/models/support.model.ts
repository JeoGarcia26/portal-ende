import { Prioridade } from './common.model';

export type TicketEstado = 'aberto' | 'em curso' | 'resolvido' | 'fechado';
export type TicketCategoria = 'ti' | 'rh' | 'instalações' | 'financeiro' | 'outro';

export interface SupportTicket {
  id: string;
  numero: string; // ex: "TCK-2026-0142"
  assunto: string;
  descricao: string;
  categoria: TicketCategoria;
  prioridade: Prioridade;
  estado: TicketEstado;
  solicitanteId: string;
  dataAbertura: string; // ISO 8601
  dataAtualizacao: string; // ISO 8601
}

export interface FaqItem {
  id: string;
  pergunta: string;
  resposta: string;
  categoria: TicketCategoria;
}
