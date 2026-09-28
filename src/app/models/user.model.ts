/**
 * Papéis de acesso dentro do portal. "gestor" tem permissões para
 * criar/editar/remover conteúdo dinâmico (notícias, comunicados, eventos, etc).
 */
export type UserRole = 'colaborador' | 'gestor' | 'admin';

export interface Department {
  id: string;
  nome: string;
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
  /** TODO(backend): substituir por emissão real de JWT/refresh token no AuthService. */
  ultimoLogin?: string;
}
