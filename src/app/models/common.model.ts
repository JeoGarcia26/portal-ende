export interface Author {
  id: string;
  nome: string;
  cargo?: string;
  avatarUrl?: string;
}

/** Envelope de paginação alinhado com o formato mais comum de APIs REST. */
export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type Prioridade = 'baixa' | 'normal' | 'alta' | 'urgente';
