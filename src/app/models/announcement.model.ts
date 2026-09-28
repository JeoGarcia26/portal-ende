import { Author } from './common.model';
import { Prioridade } from './common.model';

export type AnnouncementTipo = 'aviso' | 'manutenção' | 'evento' | 'rh' | 'segurança';

export interface Announcement {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: AnnouncementTipo;
  prioridade: Prioridade;
  autor: Author;
  dataPublicacao: string; // ISO 8601
  dataExpiracao?: string; // ISO 8601 — deixa de aparecer em destaque após esta data
  fixado: boolean; // aparece sempre no topo (ex: comunicados de direcção)
}
