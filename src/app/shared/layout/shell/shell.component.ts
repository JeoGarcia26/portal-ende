import { Component, HostListener, computed, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationsService } from '../../../core/services/notifications.service';
import { IconComponent } from '../../ui/icon/icon.component';
import { AppIconName } from '../../ui/icon/icons';
import { AppNotification, NotificationTipo, Permissao } from '../../../models';
import { SatisfactionPromptComponent } from '../../../features/satisfaction/satisfaction-prompt.component';
import { AvatarComponent } from '../../ui/avatar/avatar.component';
import { routeFade } from '../../animations/route-animations';

interface NavItem {
  label: string;
  path: string;
  icon: AppIconName;
  perm?: Permissao;
}

const NAV_GROUPS: { titulo: string; items: NavItem[] }[] = [
  {
    titulo: 'Geral',
    items: [
      { label: 'Início', path: '/inicio', icon: 'Sparkles' },
      { label: 'Notícias', path: '/noticias', icon: 'Newspaper' },
      { label: 'Comunicados', path: '/comunicados', icon: 'Megaphone' },
      { label: 'Eventos', path: '/eventos', icon: 'CalendarDays' },
    ],
  },
  {
    titulo: 'Pessoas e cultura',
    items: [
      { label: 'Reconhecimento', path: '/reconhecimento', icon: 'Trophy' },
      { label: 'Departamentos', path: '/departamentos', icon: 'Building2' },
      { label: 'Centros de distribuição', path: '/centros', icon: 'Factory' },
    ],
  },
  {
    titulo: 'Serviços',
    items: [
      { label: 'Serviços', path: '/servicos', icon: 'Briefcase' },
      { label: 'Declarações', path: '/declaracoes', icon: 'FileSignature' },
      { label: 'Documentos', path: '/documentos', icon: 'FolderOpen' },
      { label: 'Suporte', path: '/suporte', icon: 'LifeBuoy' },
    ],
  },
  {
    titulo: 'A ENDE',
    items: [{ label: 'Quem somos', path: '/sobre', icon: 'Zap' }],
  },
  {
    titulo: 'Administração',
    items: [
      { label: 'Satisfação', path: '/satisfacao', icon: 'ChartColumn', perm: 'satisfacao.ver' },
      { label: 'Privilégios', path: '/admin/privilegios', icon: 'KeyRound', perm: 'utilizadores.gerir' },
    ],
  },
];

const ICON_BY_NOTIF_TIPO: Record<NotificationTipo, AppIconName> = {
  reconhecimento: 'Trophy',
  declaracao: 'FileSignature',
  noticia: 'Newspaper',
  comunicado: 'Megaphone',
  suporte: 'LifeBuoy',
  evento: 'CalendarDays',
  sistema: 'Info',
};

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, IconComponent, AvatarComponent, SatisfactionPromptComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  animations: [routeFade],
})
export class ShellComponent {
  /** Grupos e itens filtrados pelos privilégios do utilizador actual. */
  readonly navGroups = computed(() =>
    NAV_GROUPS.map((g) => ({ ...g, items: g.items.filter((i) => !i.perm || this.auth.can(i.perm)) })).filter((g) => g.items.length)
  );
  readonly online = signal(navigator.onLine);
  readonly avaliarAberto = signal(false);
  readonly sidebarOpen = signal(false); // estado mobile
  readonly sidebarCollapsed = signal(false); // estado desktop
  readonly userMenuOpen = signal(false);
  readonly notificationsOpen = signal(false);
  readonly routeAnimation = signal('');

  constructor(
    readonly auth: AuthService,
    readonly notifications: NotificationsService,
    private readonly router: Router
  ) {}

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  toggleCollapsed(): void {
    this.sidebarCollapsed.update((v) => !v);
  }

  closeSidebarOnMobile(): void {
    this.sidebarOpen.set(false);
  }

  toggleUserMenu(): void {
    this.userMenuOpen.update((v) => !v);
    this.notificationsOpen.set(false);
  }

  toggleNotifications(): void {
    this.notificationsOpen.update((v) => !v);
    this.userMenuOpen.set(false);
  }

  iconeNotificacao(tipo: NotificationTipo): AppIconName {
    return ICON_BY_NOTIF_TIPO[tipo];
  }

  abrirNotificacao(n: AppNotification): void {
    this.notifications.marcarComoLida(n.id);
    this.notificationsOpen.set(false);
    if (n.link) this.router.navigateByUrl(n.link);
  }

  @HostListener('window:online')
  @HostListener('window:offline')
  actualizarLigacao(): void {
    this.online.set(navigator.onLine);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.sidebarOpen.set(false);
    this.userMenuOpen.set(false);
    this.notificationsOpen.set(false);
  }

  logout(): void {
    this.userMenuOpen.set(false);
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  onRouteActivate(outlet: RouterOutlet): void {
    this.routeAnimation.set(outlet.activatedRouteData?.['animation'] ?? '');
  }
}
