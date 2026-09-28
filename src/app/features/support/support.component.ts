import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupportService } from '../../core/services/support.service';
import { AuthService } from '../../core/services/auth.service';
import { Prioridade, TicketCategoria, TicketEstado } from '../../models';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { listStagger } from '../../shared/animations/route-animations';

const CATEGORIAS: TicketCategoria[] = ['ti', 'rh', 'instalações', 'financeiro', 'outro'];
const PRIORIDADES: Prioridade[] = ['baixa', 'normal', 'alta', 'urgente'];

const ESTADO_CLASS: Record<TicketEstado, string> = {
  'aberto': 'bg-warning/10 text-warning',
  'em curso': 'bg-primary-light text-primary-dark',
  'resolvido': 'bg-success/10 text-success',
  'fechado': 'bg-surface-alt text-ink-soft',
};

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './support.component.html',
  animations: [listStagger],
})
export class SupportComponent {
  readonly categorias = CATEGORIAS;
  readonly prioridades = PRIORIDADES;
  readonly aba = signal<'faq' | 'tickets' | 'novo'>('faq');
  readonly faqAberta = signal<string | null>(null);
  readonly termoFaq = signal('');

  form = { assunto: '', descricao: '', categoria: 'ti' as TicketCategoria, prioridade: 'normal' as Prioridade };
  enviado = signal(false);

  constructor(
    readonly support: SupportService,
    readonly auth: AuthService
  ) {}

  get faqsFiltradas() {
    const termo = this.termoFaq().toLowerCase().trim();
    if (!termo) return this.support.faqs();
    return this.support.faqs().filter(
      (f) => f.pergunta.toLowerCase().includes(termo) || f.resposta.toLowerCase().includes(termo)
    );
  }

  classeEstado(e: TicketEstado): string {
    return ESTADO_CLASS[e];
  }

  toggleFaq(id: string): void {
    this.faqAberta.set(this.faqAberta() === id ? null : id);
  }

  submeterTicket(): void {
    const user = this.auth.currentUser();
    this.support.abrirTicket({ ...this.form, solicitanteId: user?.id ?? 'u-000' });
    this.form = { assunto: '', descricao: '', categoria: 'ti', prioridade: 'normal' };
    this.enviado.set(true);
    this.aba.set('tickets');
    setTimeout(() => this.enviado.set(false), 3500);
  }
}
