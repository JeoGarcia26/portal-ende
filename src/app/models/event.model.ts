export type EventoTipo = 'formação' | 'institucional' | 'social' | 'reunião' | 'feriado';

export interface CompanyEvent {
  id: string;
  titulo: string;
  descricao: string;
  tipo: EventoTipo;
  dataInicio: string; // ISO 8601
  dataFim: string; // ISO 8601
  local: string;
  online?: boolean;
  vagasTotal?: number;
  vagasOcupadas?: number;
}
