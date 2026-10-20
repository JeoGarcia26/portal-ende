import { Declaracao, DestaqueMes, DistributionCenter, MudancaCargo, RespostaSatisfacao } from '../../models';

// TODO(backend): remover — substituir por GET /centros, /reconhecimento, /satisfacao, /declaracoes

const mesAtual = new Date().toISOString().slice(0, 7);
const mesAnterior = (() => {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() - 1);
  return d.toISOString().slice(0, 7);
})();
const diasAtras = (n: number) => new Date(Date.now() - n * 864e5).toISOString();

export const CRITERIOS_COLABORADOR = [
  { nome: 'Assiduidade e pontualidade', peso: 20 },
  { nome: 'Produtividade e cumprimento de metas', peso: 25 },
  { nome: 'Cumprimento das normas de segurança', peso: 20 },
  { nome: 'Trabalho em equipa', peso: 15 },
  { nome: 'Orientação ao cliente', peso: 20 },
];

export const CRITERIOS_CENTRO = [
  { nome: 'Qualidade e continuidade do fornecimento', peso: 25 },
  { nome: 'Redução de perdas técnicas e comerciais', peso: 20 },
  { nome: 'Taxa de cobrança', peso: 20 },
  { nome: 'Tempo médio de resposta a avarias', peso: 20 },
  { nome: 'Zero acidentes de trabalho', peso: 15 },
];

const com = (base: { nome: string; peso: number }[], notas: number[]) => base.map((c, i) => ({ ...c, nota: notas[i] }));

export const MOCK_CENTERS: DistributionCenter[] = [
  { id: 'cd-01', nome: 'Centro de Distribuição de Luanda Sul', provincia: 'Luanda', morada: 'Av. Pedro de Castro Van-Dúnem Loy, Talatona', responsavel: 'Eng. Helena Quissanga', telefone: '+244 222 000 101', horario: 'Seg–Sex 08h–16h · Piquete 24h', clientes: 412000, colaboradores: 286, subestacoes: 14, descricao: 'Serve Talatona, Kilamba, Benfica e Camama. Primeiro centro com telegestão integral da rede de média tensão.', imagemUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80' },
  { id: 'cd-02', nome: 'Centro de Distribuição de Luanda Norte', provincia: 'Luanda', morada: 'Rua Direita do Cazenga', responsavel: 'Eng. Bernardo Kiluange', telefone: '+244 222 000 102', horario: 'Seg–Sex 08h–16h · Piquete 24h', clientes: 538000, colaboradores: 341, subestacoes: 18, descricao: 'Maior centro do país em número de clientes, cobrindo Cazenga, Cacuaco e Sambizanga.', imagemUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=1200&q=80' },
  { id: 'cd-03', nome: 'Centro de Distribuição de Benguela', provincia: 'Benguela', morada: 'Rua 10 de Fevereiro, Benguela', responsavel: 'Eng. Rosa Tchimuku', telefone: '+244 272 000 201', horario: 'Seg–Sex 08h–16h · Piquete 24h', clientes: 198000, colaboradores: 154, subestacoes: 9, descricao: 'Abrange Benguela, Lobito e Catumbela, incluindo o corredor industrial do Lobito.', imagemUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&q=80' },
  { id: 'cd-04', nome: 'Centro de Distribuição do Huambo', provincia: 'Huambo', morada: 'Av. da República, Huambo', responsavel: 'Eng. Pedro Chissingui', telefone: '+244 241 000 301', horario: 'Seg–Sex 08h–16h · Piquete 24h', clientes: 121000, colaboradores: 98, subestacoes: 6, descricao: 'Centro de referência no planalto central, com forte programa de electrificação rural.', imagemUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80' },
  { id: 'cd-05', nome: 'Centro de Distribuição da Huíla', provincia: 'Huíla', morada: 'Rua Hoji-ya-Henda, Lubango', responsavel: 'Eng. Maria Kalunga', telefone: '+244 261 000 401', horario: 'Seg–Sex 08h–16h · Piquete 24h', clientes: 104000, colaboradores: 87, subestacoes: 5, descricao: 'Serve o Lubango e municípios vizinhos; destaque na redução de perdas comerciais.', imagemUrl: 'https://images.unsplash.com/photo-1509390144018-eeaf65052242?w=1200&q=80' },
];

export const MOCK_DESTAQUES: DestaqueMes[] = [
  { id: 'dm-01', tipo: 'colaborador', mes: mesAtual, referenciaId: 'u-011', justificacao: 'Liderou a reposição do fornecimento após a avaria na subestação de Camama em tempo recorde, sem qualquer incidente de segurança.', criterios: com(CRITERIOS_COLABORADOR, [10, 9, 10, 9, 9]) },
  { id: 'dm-02', tipo: 'centro', mes: mesAtual, referenciaId: 'cd-05', justificacao: 'Reduziu as perdas comerciais em 4,2 pontos percentuais e manteve zero acidentes pelo 6.º mês consecutivo.', criterios: com(CRITERIOS_CENTRO, [8, 10, 9, 8, 10]) },
  { id: 'dm-03', tipo: 'colaborador', mes: mesAnterior, referenciaId: 'u-009', justificacao: 'Melhor avaliação de atendimento ao cliente da rede de lojas.', criterios: com(CRITERIOS_COLABORADOR, [9, 9, 9, 10, 10]) },
  { id: 'dm-04', tipo: 'centro', mes: mesAnterior, referenciaId: 'cd-01', justificacao: 'Menor tempo médio de resposta a avarias do país.', criterios: com(CRITERIOS_CENTRO, [9, 8, 8, 10, 10]) },
];

export const MOCK_MUDANCAS_CARGO: MudancaCargo[] = [
  { id: 'mc-01', userId: 'u-011', cargoAnterior: 'Engenheira Electrotécnica', cargoNovo: 'Engenheira Electrotécnica Sénior', data: diasAtras(3), felicitacoes: [{ userId: 'u-004', nome: 'Domingos Sebastião' }] },
  { id: 'mc-02', userId: 'u-012', cargoAnterior: 'Analista Financeiro', cargoNovo: 'Analista Financeiro Sénior', data: diasAtras(9), felicitacoes: [] },
  { id: 'mc-03', userId: 'u-001', cargoAnterior: 'Gestora de Recursos Humanos', cargoNovo: 'Directora de Recursos Humanos', data: diasAtras(20), felicitacoes: [{ userId: 'u-005', nome: 'Ana Fernandes' }, { userId: 'u-003', nome: 'Paulo Mendes' }] },
];

export const MOCK_SATISFACAO: RespostaSatisfacao[] = [
  { id: 's-01', userId: 'u-002', nota: 5, comentario: 'Muito mais fácil encontrar os comunicados.', data: diasAtras(1) },
  { id: 's-02', userId: 'u-009', nota: 4, comentario: 'Gostava de ter o recibo de vencimento aqui.', data: diasAtras(2) },
  { id: 's-03', userId: 'u-011', nota: 5, data: diasAtras(4) },
  { id: 's-04', userId: 'u-012', nota: 3, comentario: 'Às vezes lento na rede móvel.', data: diasAtras(6) },
  { id: 's-05', userId: 'u-008', nota: 4, data: diasAtras(8) },
  { id: 's-06', userId: 'u-006', nota: 2, comentario: 'Falta pesquisa nos documentos.', data: diasAtras(11) },
  { id: 's-07', userId: 'u-005', nota: 5, data: diasAtras(13) },
];

export const MOCK_DECLARACOES: Declaracao[] = [
  { id: 'dc-01', codigo: 'ENDE-DEC-A1B2C3', tipo: 'serviço', finalidade: 'Abertura de conta bancária', solicitanteId: 'u-002', dataPedido: diasAtras(2), estado: 'pendente' },
];
