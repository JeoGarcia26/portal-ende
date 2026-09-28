import { Component, HostListener, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationsService } from '../../../core/services/notifications.service';
import { IconComponent } from '../../ui/icon/icon.component';
import { AppIconName } from '../../ui/icon/icons';
import { AppNotification, NotificationTipo } from '../../../models';
import { routeFade } from '../../animations/route-animations';

interface NavItem {
  label: string;
  path: string;
  icon: AppIconName;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Início', path: '/inicio', icon: 'Sparkles' },
  { label: 'Notícias', path: '/noticias', icon: 'Newspaper' },
  { label: 'Comunicados', path: '/comunicados', icon: 'Megaphone' },
  { label: 'Serviços', path: '/servicos', icon: 'Briefcase' },
  { label: 'Suporte', path: '/suporte', icon: 'LifeBuoy' },
  { label: 'Eventos', path: '/eventos', icon: 'CalendarDays' },
  { label: 'Documentos', path: '/documentos', icon: 'FolderOpen' },
];

const ICON_BY_NOTIF_TIPO: Record<NotificationTipo, AppIconName> = {
  noticia: 'Newspaper',
  comunicado: 'Megaphone',
  suporte: 'LifeBuoy',
  evento: 'CalendarDays',
  sistema: 'Info',
};

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, IconComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  animations: [routeFade],
})
export class ShellComponent {
  readonly navItems = NAV_ITEMS;
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

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.sidebarOpen.set(false);
    this.userMenuOpen.set(false);
    this.notificationsOpen.set(false);
  }

  logout(): void {
    this.auth.logout();
  }

  onRouteActivate(outlet: RouterOutlet): void {
    this.routeAnimation.set(outlet.activatedRouteData?.['animation'] ?? '');
  }
}
