/** Centros de distribuição, reconhecimento, satisfação e declarações. */

export interface DistributionCenter {
  id: string;
  nome: string;
  provincia: string;
  morada: string;
  responsavel: string;
  telefone: string;
  horario: string;
  clientes: number;
  colaboradores: number;
  subestacoes: number;
  descricao: string;
  imagemUrl: string;
}

export interface Criterio {
  nome: string;
  peso: number; // % — a soma dos pesos de uma lista é 100
  nota: number; // 0–10
}

export interface DestaqueMes {
  id: string;
  tipo: 'colaborador' | 'centro';
  mes: string; // 'YYYY-MM'
  referenciaId: string; // id do User ou do DistributionCenter
  justificacao: string;
  criterios: Criterio[];
}

export interface MudancaCargo {
  id: string;
  userId: string;
  cargoAnterior: string;
  cargoNovo: string;
  data: string; // ISO 8601
  felicitacoes: { userId: string; nome: string }[];
}

export interface RespostaSatisfacao {
  id: string;
  userId: string;
  nota: 1 | 2 | 3 | 4 | 5;
  comentario?: string;
  data: string; // ISO 8601
}

export type DeclaracaoTipo = 'serviço' | 'rendimentos' | 'efectividade';
export type DeclaracaoEstado = 'pendente' | 'assinada' | 'recusada';

export interface Declaracao {
  id: string;
  codigo: string; // código público de verificação, ex: ENDE-DEC-7F3A9C
  tipo: DeclaracaoTipo;
  finalidade: string;
  solicitanteId: string;
  dataPedido: string;
  estado: DeclaracaoEstado;
  texto?: string; // texto final (congelado no momento da assinatura)
  assinatura?: { assinanteNome: string; assinanteCargo: string; data: string; hash: string };
}
