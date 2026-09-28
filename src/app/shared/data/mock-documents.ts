import { CompanyDocument } from '../../models';

// TODO(backend): remover — substituir por GET /documentos
export const MOCK_DOCUMENTS: CompanyDocument[] = [
  { id: 'd-01', nome: 'Regulamento Interno de Trabalho', descricao: 'Versão actualizada do regulamento interno.', tipo: 'pdf', categoria: 'políticas', tamanhoKb: 842, url: '#', dataAtualizacao: '2026-06-01T00:00:00Z', versao: '3.2' },
  { id: 'd-02', nome: 'Formulário de Pedido de Férias', descricao: 'Formulário oficial para submissão manual.', tipo: 'docx', categoria: 'formulários', tamanhoKb: 96, url: '#', dataAtualizacao: '2026-03-15T00:00:00Z', versao: '1.4' },
  { id: 'd-03', nome: 'Manual de Segurança Eléctrica', descricao: 'Procedimentos de segurança para equipas de terreno.', tipo: 'pdf', categoria: 'segurança', tamanhoKb: 3120, url: '#', dataAtualizacao: '2026-05-20T00:00:00Z', versao: '2.0' },
  { id: 'd-04', nome: 'Política de Reembolso de Despesas', descricao: 'Critérios e limites para reembolso de despesas.', tipo: 'pdf', categoria: 'financeiro', tamanhoKb: 410, url: '#', dataAtualizacao: '2026-02-10T00:00:00Z', versao: '1.1' },
  { id: 'd-05', nome: 'Tabela de Benefícios RH 2026', descricao: 'Resumo de benefícios e plano de saúde.', tipo: 'xlsx', categoria: 'rh', tamanhoKb: 220, url: '#', dataAtualizacao: '2026-01-05T00:00:00Z', versao: '1.0' },
];
