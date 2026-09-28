import { FaqItem } from '../../models';

// TODO(backend): remover — substituir por GET /suporte/faq
export const MOCK_FAQS: FaqItem[] = [
  { id: 'f-01', pergunta: 'Como redefino a minha palavra-passe de acesso?', resposta: 'Aceda a Definições > Segurança e escolha "Redefinir palavra-passe". Se não tiver acesso, contacte o suporte de TI.', categoria: 'ti' },
  { id: 'f-02', pergunta: 'Como submeto um pedido de férias?', resposta: 'Vá à secção Serviços > Pedido de férias, preencha as datas pretendidas e submeta para aprovação do seu superior hierárquico.', categoria: 'rh' },
  { id: 'f-03', pergunta: 'Onde consulto o meu recibo de vencimento?', resposta: 'Os recibos ficam disponíveis em Serviços > Recibo de vencimento a partir do dia 28 de cada mês.', categoria: 'financeiro' },
  { id: 'f-04', pergunta: 'Como reporto uma avaria de equipamento informático?', resposta: 'Abra um ticket em Suporte > Novo pedido, categoria TI, descrevendo o problema. A equipa responde em até 24h úteis.', categoria: 'ti' },
  { id: 'f-05', pergunta: 'Quem contactar em caso de emergência nas instalações?', resposta: 'Ligue para a linha interna de segurança (ramal 100) ou dirija-se ao posto de segurança mais próximo.', categoria: 'instalações' },
];
