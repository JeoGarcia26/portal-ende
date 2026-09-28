export type NotificationTipo = 'noticia' | 'comunicado' | 'suporte' | 'evento' | 'sistema';

export interface AppNotification {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: NotificationTipo;
  lida: boolean;
  dataCriacao: string; // ISO 8601
  link?: string; // rota interna para navegar ao clicar
}
