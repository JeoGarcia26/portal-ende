import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NewsService } from '../../core/services/news.service';
import { AnnouncementsService } from '../../core/services/announcements.service';
import { ServicesCatalogService } from '../../core/services/services-catalog.service';
import { EventsService } from '../../core/services/events.service';
import { IconComponent } from '../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  readonly destaques = computed(() => this.news.destaques().slice(0, 3));
  readonly fixados = computed(() => this.announcements.items().filter((a) => a.fixado).slice(0, 3));
  readonly populares = computed(() => this.services.populares().slice(0, 4));
  readonly proximosEventos = computed(() => this.events.proximos().slice(0, 3));

  readonly saudacao = computed(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Bom dia';
    if (h < 19) return 'Boa tarde';
    return 'Boa noite';
  });

  constructor(
    readonly auth: AuthService,
    private readonly news: NewsService,
    private readonly announcements: AnnouncementsService,
    private readonly services: ServicesCatalogService,
    private readonly events: EventsService
  ) {}
}
