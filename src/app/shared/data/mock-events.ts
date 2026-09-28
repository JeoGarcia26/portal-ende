import { CompanyEvent } from '../../models';

// TODO(backend): remover — substituir por GET /eventos
export const MOCK_EVENTS: CompanyEvent[] = [
  { id: 'e-01', titulo: 'Simulacro de evacuação', descricao: 'Exercício obrigatório de segurança no edifício sede.', tipo: 'institucional', dataInicio: '2026-08-20T10:00:00Z', dataFim: '2026-08-20T11:00:00Z', local: 'Edifício Sede — Luanda', vagasTotal: 300, vagasOcupadas: 120 },
  { id: 'e-02', titulo: 'Confraternização de meio de ano', descricao: 'Festa de convívio entre colaboradores e famílias.', tipo: 'social', dataInicio: '2026-08-29T17:00:00Z', dataFim: '2026-08-29T22:00:00Z', local: 'Pátio da Sede', vagasTotal: 400, vagasOcupadas: 265 },
  { id: 'e-03', titulo: 'Workshop: Segurança em redes de média tensão', descricao: 'Formação técnica para equipas de operações e distribuição.', tipo: 'formação', dataInicio: '2026-09-03T08:30:00Z', dataFim: '2026-09-03T17:00:00Z', local: 'Centro de Formação ENDE', online: false, vagasTotal: 40, vagasOcupadas: 31 },
  { id: 'e-04', titulo: 'Reunião geral trimestral', descricao: 'Balanço de resultados do trimestre e apresentação de metas.', tipo: 'reunião', dataInicio: '2026-09-10T09:00:00Z', dataFim: '2026-09-10T11:00:00Z', local: 'Online — MS Teams', online: true },
  { id: 'e-05', titulo: 'Feriado Nacional — Dia dos Heróis Nacionais', descricao: 'Encerramento dos serviços administrativos.', tipo: 'feriado', dataInicio: '2026-09-17T00:00:00Z', dataFim: '2026-09-17T23:59:00Z', local: 'Nacional' },
];
