export type ServiceCategoria = 'rh' | 'ti' | 'financeiro' | 'logística' | 'jurídico' | 'geral';

export interface ServiceItem {
  id: string;
  nome: string;
  descricao: string;
  categoria: ServiceCategoria;
  /** nome do ícone (ver shared/ui/icon) */
  icone: string;
  /** rota interna (ex: '/suporte/novo') ou URL externa (ex: sistema de RH) */
  link: string;
  externo?: boolean;
  popular?: boolean;
}
