import { Author } from './common.model';

export type NewsCategoria = 'institucional' | 'operações' | 'rh' | 'projectos' | 'comunidade';

export interface NewsArticle {
  id: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  imagemUrl: string;
  categoria: NewsCategoria;
  autor: Author;
  dataPublicacao: string; // ISO 8601
  destaque: boolean;
  tempoLeituraMin: number;
  /** Uso restrito: marca d'água, sem copiar/imprimir (RF3). */
  restrito?: boolean;
  /** Notícias nunca são apagadas, apenas arquivadas (RF1). */
  arquivada?: boolean;
}
