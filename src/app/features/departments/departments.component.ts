import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { AvatarComponent } from '../../shared/ui/avatar/avatar.component';
import { IconComponent } from '../../shared/ui/icon/icon.component';

/** Departamentos integrados no portal + directório de colaboradores. */
@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [FormsModule, AvatarComponent, IconComponent],
  template: `
    <div class="mx-auto max-w-6xl">
      <div class="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 class="font-display text-2xl font-semibold tracking-tight text-ink">Departamentos</h1>
          <p class="mt-1 text-sm text-muted">Estrutura da ENDE e contactos de cada área.</p>
        </div>
        <div class="relative sm:w-72">
          <app-icon name="Search" [size]="15" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input type="search" class="input-field pl-9" placeholder="Procurar colaborador…" [ngModel]="termo()" (ngModelChange)="termo.set($event)" aria-label="Procurar colaborador" />
        </div>
      </div>

      @if (termo().trim()) {
        <div class="card divide-y divide-border">
          @for (u of encontrados(); track u.id) {
            <div class="flex items-center gap-3 p-3.5">
              <app-avatar [src]="u.avatarUrl" [nome]="u.nome" [size]="38" />
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-medium text-ink">{{ u.nome }}</p>
                <p class="truncate text-xs text-muted">{{ u.cargo }} · {{ u.departamento.nome }}</p>
              </div>
              <a [href]="'mailto:' + u.email" class="text-muted hover:text-primary" [attr.aria-label]="'Enviar e-mail a ' + u.nome"><app-icon name="Mail" [size]="16" /></a>
            </div>
          } @empty {
            <p class="p-8 text-center text-sm text-muted">Nenhum colaborador encontrado.</p>
          }
        </div>
      } @else {
        <div class="grid gap-4 md:grid-cols-2">
          @for (d of users.departamentos(); track d.id) {
            <section class="card p-5">
              <div class="flex items-start gap-3.5">
                <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-primary/10 font-display text-xs font-semibold text-primary">{{ d.sigla }}</div>
                <div class="min-w-0 flex-1">
                  <h2 class="font-display text-[15px] font-semibold text-ink">{{ d.nome }}</h2>
                  <p class="mt-1 text-sm leading-relaxed text-ink-soft">{{ d.descricao }}</p>
                  <p class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                    <span class="flex items-center gap-1"><app-icon name="Mail" [size]="12" /> {{ d.email }}</span>
                    <span class="flex items-center gap-1"><app-icon name="Phone" [size]="12" /> Ext. {{ d.extensao }}</span>
                  </p>
                </div>
              </div>
              @if (users.byId(d.responsavelId); as r) {
                <div class="mt-4 flex items-center gap-2.5 rounded-control bg-surface-alt p-2.5">
                  <app-avatar [src]="r.avatarUrl" [nome]="r.nome" [size]="32" />
                  <div class="min-w-0 text-xs">
                    <p class="font-medium text-ink">{{ r.nome }}</p>
                    <p class="text-muted">Responsável · {{ r.cargo }}</p>
                  </div>
                </div>
              }
              <button type="button" class="mt-3 flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark" (click)="alternar(d.id)" [attr.aria-expanded]="aberto() === d.id">
                {{ users.doDepartamento(d.id).length }} colaboradores no portal
                <app-icon [name]="aberto() === d.id ? 'ChevronDown' : 'ChevronRight'" [size]="13" />
              </button>
              @if (aberto() === d.id) {
                <div class="mt-3 flex flex-wrap gap-2">
                  @for (u of users.doDepartamento(d.id); track u.id) {
                    <div class="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3">
                      <app-avatar [src]="u.avatarUrl" [nome]="u.nome" [size]="24" />
                      <span class="text-xs text-ink">{{ u.nome }}</span>
                    </div>
                  }
                </div>
              }
            </section>
          }
        </div>
      }
    </div>
  `,
})
export class DepartmentsComponent {
  readonly termo = signal('');
  readonly aberto = signal<string | null>(null);
  readonly encontrados = computed(() => {
    const t = this.termo().toLowerCase().trim();
    return this.users.users().filter((u) => (u.nome + ' ' + u.cargo + ' ' + u.departamento.nome).toLowerCase().includes(t));
  });

  constructor(readonly users: UsersService) {}

  alternar(id: string): void {
    this.aberto.update((a) => (a === id ? null : id));
  }
}
