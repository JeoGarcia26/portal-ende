import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UsersService } from '../../core/services/users.service';
import { PERMISSOES, ROLE_LABEL, ROLE_PERMISSIONS, UserRole } from '../../models';
import { AvatarComponent } from '../../shared/ui/avatar/avatar.component';
import { IconComponent } from '../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-privileges',
  standalone: true,
  imports: [FormsModule, AvatarComponent, IconComponent],
  template: `
    <div class="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 class="font-display text-2xl font-semibold tracking-tight text-ink">Utilizadores e privilégios</h1>
        <p class="mt-1 text-sm text-muted">Atribua a cada colaborador o papel que define o que pode fazer no portal.</p>
      </div>

      <section class="card overflow-x-auto">
        <table class="w-full min-w-[36rem] text-sm">
          <caption class="sr-only">Privilégios concedidos por cada papel</caption>
          <thead>
            <tr class="border-b border-border text-left text-xs text-muted">
              <th scope="col" class="p-3 font-medium">Privilégio</th>
              @for (r of roles; track r) {
                <th scope="col" class="p-3 text-center font-medium">{{ label[r] }}</th>
              }
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-border">
              <th scope="row" class="p-3 text-left font-normal text-ink-soft">Consultar conteúdos, pedir declarações, avaliar o portal</th>
              @for (r of roles; track r) {
                <td class="p-3 text-center text-success"><app-icon name="CircleCheck" [size]="16" class="inline-block" /></td>
              }
            </tr>
            @for (p of permissoes; track p.id) {
              <tr class="border-b border-border last:border-0">
                <th scope="row" class="p-3 text-left font-normal text-ink-soft">{{ p.descricao }}</th>
                @for (r of roles; track r) {
                  <td class="p-3 text-center">
                    @if (matriz[r].includes(p.id)) {
                      <app-icon name="CircleCheck" [size]="16" class="inline-block text-success" />
                      <span class="sr-only">Sim</span>
                    } @else {
                      <span class="text-muted" aria-label="Não">—</span>
                    }
                  </td>
                }
              </tr>
            }
          </tbody>
        </table>
      </section>

      <section>
        <div class="mb-3 flex items-center justify-between gap-3">
          <h2 class="font-display text-lg font-semibold tracking-tight text-ink">Colaboradores</h2>
          <input type="search" class="input-field max-w-xs" placeholder="Filtrar…" [ngModel]="termo()" (ngModelChange)="termo.set($event)" aria-label="Filtrar colaboradores" />
        </div>
        <div class="card divide-y divide-border">
          @for (u of filtrados(); track u.id) {
            <div class="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
              <div class="flex min-w-0 flex-1 items-center gap-3">
                <app-avatar [src]="u.avatarUrl" [nome]="u.nome" [size]="36" />
                <div class="min-w-0">
                  <p class="truncate text-sm font-medium text-ink">{{ u.nome }} <span class="font-mono text-xs text-muted">{{ u.numeroMecanografico }}</span></p>
                  <p class="truncate text-xs text-muted">{{ u.cargo }} · {{ u.departamento.nome }}</p>
                </div>
              </div>
              <select
                class="input-field sm:w-56"
                [ngModel]="u.role"
                (ngModelChange)="users.alterarPapel(u.id, $event)"
                [disabled]="u.id === auth.currentUser()?.id"
                [attr.aria-label]="'Papel de ' + u.nome"
                [title]="u.id === auth.currentUser()?.id ? 'Não pode alterar o seu próprio papel' : ''"
              >
                @for (r of roles; track r) {
                  <option [value]="r">{{ label[r] }}</option>
                }
              </select>
            </div>
          }
        </div>
        <p class="mt-2 text-xs text-muted">As alterações têm efeito imediato. Não pode retirar os seus próprios privilégios de administração.</p>
      </section>
    </div>
  `,
})
export class PrivilegesComponent {
  readonly roles = Object.keys(ROLE_LABEL) as UserRole[];
  readonly label = ROLE_LABEL;
  readonly matriz = ROLE_PERMISSIONS;
  readonly permissoes = PERMISSOES;
  readonly termo = signal('');
  readonly filtrados = computed(() => {
    const t = this.termo().toLowerCase().trim();
    return this.users.users().filter((u) => !t || (u.nome + u.numeroMecanografico + u.departamento.nome).toLowerCase().includes(t));
  });

  constructor(
    readonly users: UsersService,
    readonly auth: AuthService
  ) {}
}
