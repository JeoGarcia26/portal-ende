import { Department } from '../../models';

// TODO(backend): remover — substituir por GET /departamentos
export const MOCK_DEPARTMENTS: Department[] = [
  { id: 'd-ca', nome: 'Conselho de Administração', sigla: 'CA', descricao: 'Órgão de gestão e orientação estratégica da ENDE.', responsavelId: 'u-010', email: 'ca@ende.co.ao', extensao: '1001' },
  { id: 'd-rh', nome: 'Recursos Humanos', sigla: 'DRH', descricao: 'Gestão de pessoas, formação, carreiras e bem-estar dos colaboradores.', responsavelId: 'u-001', email: 'rh@ende.co.ao', extensao: '2100' },
  { id: 'd-ops', nome: 'Operações e Distribuição', sigla: 'DOD', descricao: 'Exploração e manutenção da rede de distribuição de média e baixa tensão.', responsavelId: 'u-004', email: 'operacoes@ende.co.ao', extensao: '3100' },
  { id: 'd-com', nome: 'Comercial', sigla: 'DCO', descricao: 'Atendimento, facturação e cobrança aos clientes.', responsavelId: 'u-005', email: 'comercial@ende.co.ao', extensao: '4100' },
  { id: 'd-ti', nome: 'Tecnologias de Informação', sigla: 'DTI', descricao: 'Sistemas, infraestrutura, segurança informática e suporte aos utilizadores.', responsavelId: 'u-003', email: 'ti@ende.co.ao', extensao: '5100' },
  { id: 'd-fin', nome: 'Finanças', sigla: 'DFC', descricao: 'Contabilidade, tesouraria, orçamento e controlo de gestão.', responsavelId: 'u-006', email: 'financas@ende.co.ao', extensao: '6100' },
  { id: 'd-comu', nome: 'Comunicação e Imagem', sigla: 'GCI', descricao: 'Comunicação institucional, interna e relação com a imprensa.', responsavelId: 'u-007', email: 'comunicacao@ende.co.ao', extensao: '7100' },
  { id: 'd-seg', nome: 'Segurança, Higiene e Saúde no Trabalho', sigla: 'SHST', descricao: 'Prevenção de acidentes e promoção da segurança das equipas de terreno.', responsavelId: 'u-008', email: 'shst@ende.co.ao', extensao: '8100' },
];

export const dep = (id: string): Department => MOCK_DEPARTMENTS.find((d) => d.id === id)!;
