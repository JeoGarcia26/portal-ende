import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { NewsService } from '../../../core/services/news.service';
import { IconComponent } from '../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  templateUrl: './news-detail.component.html',
})
export class NewsDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly newsService = inject(NewsService);

  private readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get('id')!)), { initialValue: '' });
  readonly article = computed(() => this.newsService.byId(this.id())());
  readonly relacionadas = computed(() =>
    this.newsService
      .items()
      .filter((n) => n.id !== this.id() && n.categoria === this.article()?.categoria)
      .slice(0, 3)
  );
}
