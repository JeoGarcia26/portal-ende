import { AppNotification } from '../../models';

// TODO(backend): remover — substituir por GET /notificacoes (idealmente via WebSocket/SSE para tempo real)
export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'not-01',
    titulo: 'Novo comunicado urgente',
    mensagem: 'Simulacro de evacuação agendado para 20 de Agosto.',
    tipo: 'comunicado',
    lida: false,
    dataCriacao: '2026-08-12T08:00:00Z',
    link: '/comunicados',
  },
  {
    id: 'not-02',
    titulo: 'O teu pedido foi actualizado',
    mensagem: 'O ticket TCK-2026-0142 passou para "em curso".',
    tipo: 'suporte',
    lida: false,
    dataCriacao: '2026-08-11T15:30:00Z',
    link: '/suporte',
  },
  {
    id: 'not-03',
    titulo: 'Nova notícia publicada',
    mensagem: 'ENDE conclui reabilitação da subestação do Kilamba.',
    tipo: 'noticia',
    lida: true,
    dataCriacao: '2026-08-10T09:05:00Z',
    link: '/noticias/n-001',
  },
  {
    id: 'not-04',
    titulo: 'Inscrições abertas',
    mensagem: 'Confraternização de meio de ano — inscreve-te até sexta-feira.',
    tipo: 'evento',
    lida: true,
    dataCriacao: '2026-08-04T12:10:00Z',
    link: '/eventos',
  },
];
