import { User } from '../../models';

// TODO(backend): remover — substituir por chamada real a /auth/login.
export const MOCK_USERS: (User & { password: string })[] = [
  {
    id: 'u-001',
    nome: 'Isabel Nascimento',
    numeroMecanografico: 'NM10234',
    email: 'isabel.nascimento@ende.co.ao',
    cargo: 'Gestora de Recursos Humanos',
    departamento: { id: 'd-rh', nome: 'Recursos Humanos' },
    role: 'gestor',
    avatarUrl: '',
    ultimoLogin: new Date().toISOString(),
    password: 'ende2026',
  },
  {
    id: 'u-002',
    nome: 'João Kiala',
    numeroMecanografico: 'NM48591',
    email: 'joao.kiala@ende.co.ao',
    cargo: 'Técnico de Distribuição',
    departamento: { id: 'd-ops', nome: 'Operações e Distribuição' },
    role: 'colaborador',
    avatarUrl: '',
    ultimoLogin: new Date().toISOString(),
    password: 'ende2026',
  },
];
