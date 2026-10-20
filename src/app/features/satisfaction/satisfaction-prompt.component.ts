import { Component, EventEmitter, Output, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { SatisfactionService } from '../../core/services/satisfaction.service';
import { RespostaSatisfacao } from '../../models';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { AppIconName } from '../../shared/ui/icon/icons';
import { ModalComponent } from '../../shared/ui/modal/modal.component';

export const ESCALA: { nota: RespostaSatisfacao['nota']; icone: AppIconName; rotulo: string }[] = [
  { nota: 1, icone: 'Angry', rotulo: 'Muito insatisfeito' },
  { nota: 2, icone: 'Frown', rotulo: 'Insatisfeito' },
  { nota: 3, icone: 'Meh', rotulo: 'Indiferente' },
  { nota: 4, icone: 'Smile', rotulo: 'Satisfeito' },
  { nota: 5, icone: 'Laugh', rotulo: 'Muito satisfeito' },
];

/** Inquérito rápido de satisfação (aberto a partir do shell). */
@Component({
  selector: 'app-satisfaction-prompt',
  standalone: true,
  imports: [NgClass, FormsModule, IconComponent, ModalComponent],
  template: `
    <app-modal title="Qual o seu grau de satisfação com o portal?" (close)="fechar.emit()">
      @if (enviado()) {
        <div class="py-6 text-center">
          <app-icon name="Heart" [size]="32" class="mx-auto text-primary" />
          <p class="mt-3 text-sm font-medium text-ink">Obrigado pela sua opinião!</p>
          <p class="mt-1 text-xs text-muted">Ajuda-nos a melhorar o Portal do Colaborador.</p>
        </div>
      } @else {
        <form (ngSubmit)="enviar()">
          <div class="flex justify-between gap-1" role="radiogroup" aria-label="Grau de satisfação">
            @for (e of escala; track e.nota) {
              <button
                type="button"
                role="radio"
                [attr.aria-checked]="nota() === e.nota"
                [attr.aria-label]="e.rotulo"
                (click)="nota.set(e.nota)"
                class="flex flex-1 flex-col items-center gap-1.5 rounded-control border px-1 py-3 transition-colors"
                [ngClass]="nota() === e.nota ? 'border-primary bg-primary/10 text-primary' : 'border-border text-ink-soft'"
              >
                <app-icon [name]="e.icone" [size]="28" />
                <span class="text-center text-[10px] leading-tight">{{ e.rotulo }}</span>
              </button>
            }
          </div>
          <label for="sat-com" class="mb-1.5 mt-5 block text-sm font-medium text-ink">Comentário (opcional)</label>
          <textarea id="sat-com" class="input-field" rows="3" placeholder="O que podemos melhorar?" [(ngModel)]="comentario" name="comentario"></textarea>
          <div class="mt-4 flex justify-end gap-2.5">
            <button type="button" class="btn-secondary" (click)="fechar.emit()">Agora não</button>
            <button type="submit" class="btn-primary" [disabled]="!nota()">Enviar</button>
          </div>
        </form>
      }
    </app-modal>
  `,
})
export class SatisfactionPromptComponent {
  @Output() fechar = new EventEmitter<void>();
  readonly escala = ESCALA;
  readonly nota = signal<RespostaSatisfacao['nota'] | null>(null);
  readonly enviado = signal(false);
  comentario = '';

  constructor(
    private readonly auth: AuthService,
    private readonly satisfaction: SatisfactionService
  ) {}

  enviar(): void {
    const n = this.nota();
    const u = this.auth.currentUser();
    if (!n || !u) return;
    this.satisfaction.responder({ userId: u.id, nota: n, comentario: this.comentario.trim() || undefined });
    this.enviado.set(true);
    setTimeout(() => this.fechar.emit(), 1600);
  }
}
