import { Component, Input, signal } from '@angular/core';

/** Fotografia do colaborador, com as iniciais como alternativa (sem foto, offline, erro). */
@Component({
  selector: 'app-avatar',
  standalone: true,
  template: `
    <div
      class="flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 font-semibold text-primary"
      [style.width.px]="size"
      [style.height.px]="size"
      [style.font-size.px]="size * 0.38"
    >
      @if (src && !falhou()) {
        <img [src]="src" [alt]="nome" class="h-full w-full object-cover" loading="lazy" (error)="falhou.set(true)" />
      } @else {
        {{ iniciais }}
      }
    </div>
  `,
})
export class AvatarComponent {
  @Input() src?: string;
  @Input() nome = '';
  @Input() size = 40;
  readonly falhou = signal(false);

  get iniciais(): string {
    const p = this.nome.trim().split(/\s+/);
    return ((p[0]?.[0] ?? '') + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase();
  }
}
