import { Announcement } from '../../models';

// TODO(backend): remover — substituir por GET /comunicados
export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'c-001',
    titulo: 'Manutenção programada do sistema de facturação — 16 de Agosto',
    mensagem: 'O sistema de facturação estará indisponível entre as 22h00 de sábado e as 06h00 de domingo para actualização de infraestrutura. Planeie o encerramento de tarefas pendentes com antecedência.',
    tipo: 'manutenção',
    prioridade: 'alta',
    autor: { id: 'a-04', nome: 'Direcção de TI', cargo: 'Tecnologias de Informação' },
    dataPublicacao: '2026-08-11T10:00:00Z',
    dataExpiracao: '2026-08-17T00:00:00Z',
    fixado: true,
  },
  {
    id: 'c-002',
    titulo: 'Novo horário de atendimento no balcão de RH',
    mensagem: 'A partir de 1 de Setembro, o balcão de atendimento de Recursos Humanos passa a funcionar das 08h00 às 15h00, de segunda a sexta-feira.',
    tipo: 'rh',
    prioridade: 'normal',
    autor: { id: 'a-02', nome: 'Isabel Nascimento', cargo: 'Gestora de Recursos Humanos' },
    dataPublicacao: '2026-08-09T09:00:00Z',
    fixado: true,
  },
  {
    id: 'c-003',
    titulo: 'Simulacro de evacuação — Edifício Sede',
    mensagem: 'Realizar-se-á um simulacro de evacuação no dia 20 de Agosto, pelas 10h00. A participação de todos os colaboradores presentes no edifício sede é obrigatória.',
    tipo: 'segurança',
    prioridade: 'urgente',
    autor: { id: 'a-05', nome: 'Segurança e Saúde no Trabalho', cargo: 'SST' },
    dataPublicacao: '2026-08-07T08:00:00Z',
    fixado: false,
  },
  {
    id: 'c-004',
    titulo: 'Confraternização de meio de ano',
    mensagem: 'A festa de confraternização dos colaboradores realiza-se no dia 29 de Agosto, a partir das 17h00, no pátio da sede. Inscrições através do portal, secção Eventos.',
    tipo: 'evento',
    prioridade: 'baixa',
    autor: { id: 'a-02', nome: 'Isabel Nascimento', cargo: 'Gestora de Recursos Humanos' },
    dataPublicacao: '2026-08-04T12:00:00Z',
    fixado: false,
  },
];
