import { Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RecognitionService } from '../../core/services/recognition.service';
import { IconComponent } from '../../shared/ui/icon/icon.component';

/** Rubrica "Conheça os nossos centros de distribuição". */
@Component({
  selector: 'app-centers',
  standalone: true,
  imports: [DecimalPipe, FormsModule, RouterLink, IconComponent],
  template: `
    <div class="mx-auto max-w-6xl">
      <div class="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 class="font-display text-2xl font-semibold tracking-tight text-ink">Conheça os nossos centros de distribuição</h1>
          <p class="mt-1 text-sm text-muted">Quem são, onde estão e quem os lidera — para conhecermos melhor a nossa instituição.</p>
        </div>
        <select class="input-field sm:w-52" [ngModel]="provincia()" (ngModelChange)="provincia.set($event)" aria-label="Filtrar por província">
          <option value="">Todas as províncias</option>
          @for (p of provincias(); track p) {
            <option [value]="p">{{ p }}</option>
          }
        </select>
      </div>

      <div class="grid gap-5 md:grid-cols-2">
        @for (c of filtrados(); track c.id) {
          <article class="card overflow-hidden">
            <div class="relative aspect-[16/7] bg-surface-alt">
              <img [src]="c.imagemUrl" [alt]="c.nome" class="h-full w-full object-cover" loading="lazy" />
              @if (recognition.centroDoMes()?.referenciaId === c.id) {
                <span class="badge absolute left-3 top-3 bg-accent text-ink"><app-icon name="Trophy" [size]="13" /> Centro do mês</span>
              }
            </div>
            <div class="p-5">
              <p class="text-xs font-medium uppercase tracking-wide text-primary">{{ c.provincia }}</p>
              <h2 class="mt-1 font-display text-lg font-semibold tracking-tight text-ink">{{ c.nome }}</h2>
              <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ c.descricao }}</p>
              <div class="mt-4 grid grid-cols-3 gap-2 text-center">
                <div class="rounded-control bg-surface-alt py-2">
                  <p class="font-display text-base font-semibold text-ink">{{ c.clientes | number: '1.0-0' }}</p>
                  <p class="text-[11px] text-muted">clientes</p>
                </div>
                <div class="rounded-control bg-surface-alt py-2">
                  <p class="font-display text-base font-semibold text-ink">{{ c.colaboradores }}</p>
                  <p class="text-[11px] text-muted">colaboradores</p>
                </div>
                <div class="rounded-control bg-surface-alt py-2">
                  <p class="font-display text-base font-semibold text-ink">{{ c.subestacoes }}</p>
                  <p class="text-[11px] text-muted">subestações</p>
                </div>
              </div>
              <ul class="mt-4 space-y-1.5 text-sm text-ink-soft">
                <li class="flex items-center gap-2"><app-icon name="User" [size]="15" class="text-muted" /> {{ c.responsavel }}</li>
                <li class="flex items-center gap-2"><app-icon name="MapPin" [size]="15" class="text-muted" /> {{ c.morada }}</li>
                <li class="flex items-center gap-2"><app-icon name="Phone" [size]="15" class="text-muted" /> {{ c.telefone }}</li>
                <li class="flex items-center gap-2"><app-icon name="Clock" [size]="15" class="text-muted" /> {{ c.horario }}</li>
              </ul>
            </div>
          </article>
        }
      </div>
      <a routerLink="/reconhecimento" class="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark">
        Ver o centro de distribuição do mês e os critérios <app-icon name="ArrowRight" [size]="14" />
      </a>
    </div>
  `,
})
export class CentersComponent {
  readonly provincia = signal('');
  readonly provincias = computed(() => [...new Set(this.recognition.centros().map((c) => c.provincia))]);
  readonly filtrados = computed(() => this.recognition.centros().filter((c) => !this.provincia() || c.provincia === this.provincia()));
  constructor(readonly recognition: RecognitionService) {}
}
