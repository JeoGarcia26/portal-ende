import { SupportTicket } from '../../models';

// TODO(backend): remover — substituir por GET/POST /suporte/tickets
export const MOCK_TICKETS: SupportTicket[] = [
  { id: 't-01', numero: 'TCK-2026-0142', assunto: 'Computador não liga', descricao: 'O computador da minha estação de trabalho não liga desde ontem.', categoria: 'ti', prioridade: 'alta', estado: 'em curso', solicitanteId: 'u-002', dataAbertura: '2026-08-10T08:20:00Z', dataAtualizacao: '2026-08-11T09:00:00Z' },
  { id: 't-02', numero: 'TCK-2026-0139', assunto: 'Dúvida sobre plano de saúde', descricao: 'Gostaria de saber quais clínicas estão cobertas na Huíla.', categoria: 'rh', prioridade: 'normal', estado: 'resolvido', solicitanteId: 'u-002', dataAbertura: '2026-08-05T10:00:00Z', dataAtualizacao: '2026-08-06T14:00:00Z' },
];
