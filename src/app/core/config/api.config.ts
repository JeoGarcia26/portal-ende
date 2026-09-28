/**
 * TODO(backend): definir aqui o URL base real da API (ex: via environment.ts
 * quando gerares os ficheiros de ambiente com `ng generate environments`).
 * Todos os serviços que já usam HttpClient devem importar API_BASE_URL
 * daqui em vez de escrever o URL directamente.
 */
export const API_BASE_URL = '/api';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    me: `${API_BASE_URL}/auth/me`,
    refresh: `${API_BASE_URL}/auth/refresh`,
    logout: `${API_BASE_URL}/auth/logout`,
  },
  noticias: `${API_BASE_URL}/noticias`,
  comunicados: `${API_BASE_URL}/comunicados`,
  servicos: `${API_BASE_URL}/servicos`,
  eventos: `${API_BASE_URL}/eventos`,
  documentos: `${API_BASE_URL}/documentos`,
  suporte: {
    tickets: `${API_BASE_URL}/suporte/tickets`,
    faq: `${API_BASE_URL}/suporte/faq`,
  },
  notificacoes: `${API_BASE_URL}/notificacoes`,
  uploads: `${API_BASE_URL}/uploads`,
};
