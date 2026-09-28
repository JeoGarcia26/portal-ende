import { ServiceItem } from '../../models';

// TODO(backend): remover — substituir por GET /servicos
export const MOCK_SERVICES: ServiceItem[] = [
  { id: 's-01', nome: 'Pedido de férias', descricao: 'Submeter e acompanhar pedidos de férias e ausências.', categoria: 'rh', icone: 'CalendarDays', link: '/servicos', popular: true },
  { id: 's-02', nome: 'Recibo de vencimento', descricao: 'Consultar e descarregar recibos de vencimento mensais.', categoria: 'financeiro', icone: 'FileText', link: '/servicos', popular: true },
  { id: 's-03', nome: 'Suporte técnico (TI)', descricao: 'Reportar avarias de equipamento, acessos e software.', categoria: 'ti', icone: 'Wrench', link: '/suporte', popular: true },
  { id: 's-04', nome: 'Requisição de material', descricao: 'Solicitar material de escritório ou equipamento de terreno.', categoria: 'logística', icone: 'FolderOpen', link: '/servicos' },
  { id: 's-05', nome: 'Declarações e certidões', descricao: 'Emitir declarações de trabalho e certidões diversas.', categoria: 'rh', icone: 'FileText', link: '/servicos' },
  { id: 's-06', nome: 'Apoio jurídico interno', descricao: 'Esclarecimento de dúvidas contratuais e legais.', categoria: 'jurídico', icone: 'Shield', link: '/servicos' },
  { id: 's-07', nome: 'Plano de saúde', descricao: 'Consultar rede de clínicas e submeter reembolsos.', categoria: 'rh', icone: 'HeartHandshake', link: '/servicos', popular: true },
  { id: 's-08', nome: 'Reserva de sala de reuniões', descricao: 'Marcar salas de reunião e equipamento audiovisual.', categoria: 'geral', icone: 'Presentation', link: '/servicos' },
  { id: 's-09', nome: 'Formação e desenvolvimento', descricao: 'Inscrição em acções de formação interna e externa.', categoria: 'rh', icone: 'GraduationCap', link: '/servicos' },
];
