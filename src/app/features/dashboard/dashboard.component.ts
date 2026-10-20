import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NewsService } from '../../core/services/news.service';
import { AnnouncementsService } from '../../core/services/announcements.service';
import { ServicesCatalogService } from '../../core/services/services-catalog.service';
import { EventsService } from '../../core/services/events.service';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { AvatarComponent } from '../../shared/ui/avatar/avatar.component';
import { UsersService } from '../../core/services/users.service';
import { RecognitionService } from '../../core/services/recognition.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent, AvatarComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  /** Coloca o vídeo em public/videos/banner.mp4 (MP4 H.264, sem som, ~10–30 s, idealmente < 8 MB). */
  readonly videoUrl = '/videos/banner.mp4';
  readonly videoPronto = signal(false);
  readonly aReproduzir = signal(false);
  readonly reduzirMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    private readonly events: EventsService,
    readonly users: UsersService,
    readonly recognition: RecognitionService
  ) {}
}
