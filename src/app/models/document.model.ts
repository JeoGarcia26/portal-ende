export type DocumentoTipo = 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'imagem' | 'outro';
export type DocumentoCategoria = 'políticas' | 'formulários' | 'manuais' | 'financeiro' | 'rh' | 'segurança';

export interface CompanyDocument {
  id: string;
  nome: string;
  descricao?: string;
  tipo: DocumentoTipo;
  categoria: DocumentoCategoria;
  tamanhoKb: number;
  url: string;
  dataAtualizacao: string; // ISO 8601
  versao: string;
}
