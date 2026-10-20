import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { AppIconName } from '../../shared/ui/icon/icons';
import { RecognitionService } from '../../core/services/recognition.service';

const VALORES: { nome: string; icone: AppIconName }[] = [
  { nome: 'Orientação ao Cliente', icone: 'HeartHandshake' },
  { nome: 'Excelência', icone: 'Gem' },
  { nome: 'Sustentabilidade', icone: 'Leaf' },
  { nome: 'Inovação', icone: 'Lightbulb' },
  { nome: 'Ética', icone: 'Scale' },
  { nome: 'Comprometimento', icone: 'Handshake' },
  { nome: 'Valorização do Indivíduo', icone: 'UserCheck' },
  { nome: 'Trabalho em Equipa', icone: 'Users' },
];

const PILARES: { nome: string; icone: AppIconName; texto: string }[] = [
  { nome: 'Universalidade', icone: 'Network', texto: 'Levar energia a todos os angolanos, em todas as províncias.' },
  { nome: 'Disponibilidade', icone: 'Clock', texto: 'Piquetes 24 horas por dia, 7 dias por semana.' },
  { nome: 'Proximidade', icone: 'Handshake', texto: 'Perto dos clientes, das comunidades e dos colaboradores.' },
];

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, IconComponent],
  template: `
    <div class="mx-auto max-w-5xl space-y-10">
      <section class="brand-panel rounded-card px-6 py-10 text-center sm:px-10">
        <img src="/logo-ende-white.png" alt="ENDE" class="relative mx-auto h-16 w-auto rounded-lg" />
        <p class="relative mt-4 text-xs font-medium uppercase tracking-[0.2em] text-white/50">Empresa Nacional de Distribuição de Electricidade — E.P.</p>
        <h1 class="relative mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">Quem somos?</h1>
      </section>

      <div class="grid gap-5 md:grid-cols-2">
        <section class="card card-accent-left p-6">
          <div class="flex items-center gap-2.5 text-primary">
            <app-icon name="Target" [size]="20" />
            <h2 class="font-display text-lg font-semibold uppercase tracking-wide">Missão</h2>
          </div>
          <p class="mt-3 text-[15px] italic leading-relaxed text-ink">
            Prestar um serviço de fornecimento de electricidade com qualidade, contribuindo para o bem-estar das pessoas e para o
            crescimento da economia.
          </p>
        </section>
        <section class="card card-accent-left p-6">
          <div class="flex items-center gap-2.5 text-primary">
            <app-icon name="Eye" [size]="20" />
            <h2 class="font-display text-lg font-semibold uppercase tracking-wide">Visão</h2>
          </div>
          <p class="mt-3 text-[15px] italic leading-relaxed text-ink">
            Ser uma referência de valor acrescentado para colaboradores e para a sociedade.
          </p>
        </section>
      </div>

      <section>
        <div class="mb-4 flex items-center gap-2.5 text-primary">
          <app-icon name="Gem" [size]="20" />
          <h2 class="font-display text-lg font-semibold uppercase tracking-wide">Valores</h2>
        </div>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
          @for (v of valores; track v.nome) {
            <div class="card flex flex-col items-center gap-2.5 p-4 text-center">
              <div class="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <app-icon [name]="v.icone" [size]="20" />
              </div>
              <p class="text-sm font-medium text-ink">{{ v.nome }}</p>
            </div>
          }
        </div>
      </section>

      <section class="grid gap-4 sm:grid-cols-3">
        @for (p of pilares; track p.nome) {
          <div class="flex items-start gap-3 rounded-card border border-border bg-surface p-4">
            <app-icon [name]="p.icone" [size]="22" class="mt-0.5 text-primary" />
            <div>
              <p class="text-sm font-semibold uppercase tracking-wide text-ink">{{ p.nome }}</p>
              <p class="mt-1 text-xs leading-relaxed text-muted">{{ p.texto }}</p>
            </div>
          </div>
        }
      </section>

      <section class="card flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
        <div>
          <h2 class="font-display text-lg font-semibold tracking-tight text-ink">Conheça os nossos centros de distribuição</h2>
          <p class="mt-1 text-sm text-muted">{{ recognition.centros().length }} centros ao serviço das comunidades em todo o país.</p>
        </div>
        <a routerLink="/centros" class="btn-primary shrink-0">Ver centros <app-icon name="ArrowRight" [size]="15" /></a>
      </section>
    </div>
  `,
})
export class AboutComponent {
  readonly valores = VALORES;
  readonly pilares = PILARES;
  constructor(readonly recognition: RecognitionService) {}
}
