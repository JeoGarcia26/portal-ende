import { Component, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SatisfactionService } from '../../core/services/satisfaction.service';
import { UsersService } from '../../core/services/users.service';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { ESCALA } from './satisfaction-prompt.component';

@Component({
  selector: 'app-satisfaction-results',
  standalone: true,
  imports: [DatePipe, IconComponent],
  template: `
    <div class="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 class="font-display text-2xl font-semibold tracking-tight text-ink">Grau de satisfação dos utilizadores</h1>
        <p class="mt-1 text-sm text-muted">Respostas ao inquérito "Avaliar o portal".</p>
      </div>

      <div class="grid gap-4 sm:grid-cols-3">
        <div class="card p-5">
          <p class="text-xs text-muted">Nota média</p>
          <p class="mt-1 font-display text-3xl font-semibold text-ink">{{ s.media() }}<span class="text-base text-muted">/5</span></p>
        </div>
        <div class="card p-5">
          <p class="text-xs text-muted">Satisfeitos (nota 4–5)</p>
          <p class="mt-1 font-display text-3xl font-semibold text-success">{{ s.satisfeitos() }}%</p>
        </div>
        <div class="card p-5">
          <p class="text-xs text-muted">Respostas</p>
          <p class="mt-1 font-display text-3xl font-semibold text-ink">{{ s.respostas().length }}</p>
        </div>
      </div>

      <section class="card p-5">
        <h2 class="mb-4 text-sm font-semibold text-ink">Distribuição das respostas</h2>
        <ul class="space-y-3">
          @for (d of s.distribuicao(); track d.nota) {
            <li class="flex items-center gap-3 text-sm">
              <span class="flex w-40 shrink-0 items-center gap-2 text-ink-soft">
                <app-icon [name]="escala[d.nota - 1].icone" [size]="16" /> {{ escala[d.nota - 1].rotulo }}
              </span>
              <div class="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-alt">
                <div class="h-full rounded-full bg-primary" [style.width.%]="max() ? (d.total / max()) * 100 : 0"></div>
              </div>
              <span class="w-8 text-right font-mono text-xs text-ink">{{ d.total }}</span>
            </li>
          }
        </ul>
      </section>

      <section class="card divide-y divide-border">
        <h2 class="p-5 text-sm font-semibold text-ink">Comentários recentes</h2>
        @for (r of comentarios(); track r.id) {
          <div class="flex items-start gap-3 p-4">
            <app-icon [name]="escala[r.nota - 1].icone" [size]="18" class="mt-0.5 text-primary" />
            <div class="min-w-0 flex-1">
              <p class="text-sm text-ink">{{ r.comentario }}</p>
              <p class="mt-0.5 text-xs text-muted">{{ users.byId(r.userId)?.departamento?.nome }} · {{ r.data | date: 'dd MMM yyyy' }}</p>
            </div>
          </div>
        } @empty {
          <p class="p-6 text-center text-sm text-muted">Sem comentários.</p>
        }
      </section>
    </div>
  `,
})
export class SatisfactionResultsComponent {
  readonly escala = ESCALA;
  readonly max = computed(() => Math.max(...this.s.distribuicao().map((d) => d.total)));
  readonly comentarios = computed(() => this.s.respostas().filter((r) => r.comentario));
  constructor(
    readonly s: SatisfactionService,
    readonly users: UsersService
  ) {}
}
