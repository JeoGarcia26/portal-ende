import { User } from '../../models';
import { dep } from './mock-departments';

/** Data de nascimento relativa a hoje, para a demo ter sempre aniversariantes. */
function nascimento(diasAPartirDeHoje: number, ano: number): string {
  const d = new Date();
  d.setDate(d.getDate() + diasAPartirDeHoje);
  d.setFullYear(ano);
  return d.toISOString().slice(0, 10);
}

const foto = (n: number) => `https://i.pravatar.cc/300?img=${n}`;

// TODO(backend): remover — substituir por /auth/login e GET /colaboradores.
// Todas as contas de demonstração usam a palavra-passe "ende2026".
export const MOCK_USERS: (User & { password: string })[] = [
  { id: 'u-001', nome: 'Isabel Nascimento', numeroMecanografico: 'NM10234', email: 'isabel.nascimento@ende.co.ao', cargo: 'Directora de Recursos Humanos', departamento: dep('d-rh'), role: 'rh', avatarUrl: foto(47), dataNascimento: nascimento(0, 1984), dataAdmissao: '2011-03-01', password: 'ende2026' },
  { id: 'u-002', nome: 'João Kiala', numeroMecanografico: 'NM48591', email: 'joao.kiala@ende.co.ao', cargo: 'Técnico de Distribuição', departamento: dep('d-ops'), role: 'colaborador', avatarUrl: foto(12), dataNascimento: nascimento(3, 1992), dataAdmissao: '2018-06-11', password: 'ende2026' },
  { id: 'u-000', nome: 'Administrador do Sistema', numeroMecanografico: 'NM00001', email: 'admin@ende.co.ao', cargo: 'Administrador do Portal', departamento: dep('d-ti'), role: 'admin', password: 'ende2026' },
  { id: 'u-003', nome: 'Paulo Mendes', numeroMecanografico: 'NM20311', email: 'paulo.mendes@ende.co.ao', cargo: 'Director de TI', departamento: dep('d-ti'), role: 'gestor', avatarUrl: foto(53), dataNascimento: nascimento(0, 1979), dataAdmissao: '2009-01-15', password: 'ende2026' },
  { id: 'u-004', nome: 'Domingos Sebastião', numeroMecanografico: 'NM15520', email: 'domingos.sebastiao@ende.co.ao', cargo: 'Director de Operações', departamento: dep('d-ops'), role: 'gestor', avatarUrl: foto(60), dataNascimento: nascimento(12, 1975), dataAdmissao: '2005-09-01', password: 'ende2026' },
  { id: 'u-005', nome: 'Ana Fernandes', numeroMecanografico: 'NM30877', email: 'ana.fernandes@ende.co.ao', cargo: 'Directora Comercial', departamento: dep('d-com'), role: 'gestor', avatarUrl: foto(45), dataNascimento: nascimento(5, 1986), dataAdmissao: '2012-02-20', password: 'ende2026' },
  { id: 'u-006', nome: 'Manuel Tchipilica', numeroMecanografico: 'NM41102', email: 'manuel.tchipilica@ende.co.ao', cargo: 'Director Financeiro', departamento: dep('d-fin'), role: 'colaborador', avatarUrl: foto(68), dataNascimento: nascimento(-40, 1981), dataAdmissao: '2014-04-07', password: 'ende2026' },
  { id: 'u-007', nome: 'Luzia Cambinda', numeroMecanografico: 'NM50219', email: 'luzia.cambinda@ende.co.ao', cargo: 'Chefe de Comunicação e Imagem', departamento: dep('d-comu'), role: 'gestor', avatarUrl: foto(44), dataNascimento: nascimento(1, 1990), dataAdmissao: '2016-08-01', password: 'ende2026' },
  { id: 'u-008', nome: 'Afonso Muteka', numeroMecanografico: 'NM33014', email: 'afonso.muteka@ende.co.ao', cargo: 'Responsável de SHST', departamento: dep('d-seg'), role: 'colaborador', avatarUrl: foto(15), dataNascimento: nascimento(20, 1983), dataAdmissao: '2013-11-04', password: 'ende2026' },
  { id: 'u-009', nome: 'Teresa Lukamba', numeroMecanografico: 'NM58830', email: 'teresa.lukamba@ende.co.ao', cargo: 'Supervisora de Atendimento', departamento: dep('d-com'), role: 'colaborador', avatarUrl: foto(32), dataNascimento: nascimento(6, 1994), dataAdmissao: '2019-05-13', password: 'ende2026' },
  { id: 'u-010', nome: 'Rui Santos', numeroMecanografico: 'NM10002', email: 'rui.santos@ende.co.ao', cargo: 'Presidente do Conselho de Administração', departamento: dep('d-ca'), role: 'colaborador', avatarUrl: foto(59), dataNascimento: nascimento(-100, 1970), dataAdmissao: '2020-01-02', password: 'ende2026' },
  { id: 'u-011', nome: 'Helena Quissanga', numeroMecanografico: 'NM61190', email: 'helena.quissanga@ende.co.ao', cargo: 'Engenheira Electrotécnica Sénior', departamento: dep('d-ops'), role: 'colaborador', avatarUrl: foto(49), dataNascimento: nascimento(-2, 1991), dataAdmissao: '2017-10-02', password: 'ende2026' },
  { id: 'u-012', nome: 'Carlos Ndala', numeroMecanografico: 'NM62004', email: 'carlos.ndala@ende.co.ao', cargo: 'Analista Financeiro Sénior', departamento: dep('d-fin'), role: 'colaborador', avatarUrl: foto(13), dataNascimento: nascimento(25, 1993), dataAdmissao: '2020-03-16', password: 'ende2026' },
];
