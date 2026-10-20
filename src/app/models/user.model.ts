/**
 * Papéis de acesso dentro do portal. Cada papel concede um conjunto de
 * privilégios (ver ROLE_PERMISSIONS). O admin altera papéis em /admin/privilegios.
 */
export type UserRole = 'colaborador' | 'gestor' | 'rh' | 'admin';

export type Permissao =
  | 'conteudo.publicar' // notícias, comunicados, eventos, documentos
  | 'reconhecimento.gerir' // colaborador/centro do mês, mudanças de cargo
  | 'declaracoes.assinar' // assinar digitalmente declarações
  | 'satisfacao.ver' // resultados do inquérito de satisfação
  | 'utilizadores.gerir'; // atribuir papéis/privilégios

export const PERMISSOES: { id: Permissao; descricao: string }[] = [
  { id: 'conteudo.publicar', descricao: 'Publicar notícias, comunicados e documentos' },
  { id: 'reconhecimento.gerir', descricao: 'Gerir colaborador/centro do mês e mudanças de cargo' },
  { id: 'declaracoes.assinar', descricao: 'Assinar digitalmente declarações' },
  { id: 'satisfacao.ver', descricao: 'Ver resultados de satisfação' },
  { id: 'utilizadores.gerir', descricao: 'Gerir utilizadores e privilégios' },
];

// TODO(backend): a matriz final de privilégios deve vir (e ser validada) no servidor.
export const ROLE_PERMISSIONS: Record<UserRole, Permissao[]> = {
  colaborador: [],
  gestor: ['conteudo.publicar', 'satisfacao.ver'],
  rh: ['conteudo.publicar', 'reconhecimento.gerir', 'declaracoes.assinar', 'satisfacao.ver'],
  admin: PERMISSOES.map((p) => p.id),
};

export const ROLE_LABEL: Record<UserRole, string> = {
  colaborador: 'Colaborador',
  gestor: 'Gestor de conteúdos',
  rh: 'Recursos Humanos',
  admin: 'Administrador',
};

export interface Department {
  id: string;
  nome: string;
  sigla?: string;
  descricao?: string;
  responsavelId?: string;
  email?: string;
  extensao?: string;
}

export interface User {
  id: string;
  nome: string;
  /** Credencial de login. Formato "NM" + 5 dígitos, ex: NM10234. */
  numeroMecanografico: string;
  email: string;
  cargo: string;
  departamento: Department;
  avatarUrl?: string;
  role: UserRole;
  /** ISO 8601 (só dia/mês são usados para aniversários). */
  dataNascimento?: string;
  dataAdmissao?: string;
  /** TODO(backend): substituir por emissão real de JWT/refresh token no AuthService. */
  ultimoLogin?: string;
}
