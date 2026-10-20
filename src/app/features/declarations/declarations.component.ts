import { Component, computed, signal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { DeclarationsService } from '../../core/services/declarations.service';
import { UsersService } from '../../core/services/users.service';
import { Declaracao, DeclaracaoEstado, DeclaracaoTipo } from '../../models';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { ModalComponent } from '../../shared/ui/modal/modal.component';

const ESTADO_CLASS: Record<DeclaracaoEstado, string> = {
  pendente: 'bg-warning/10 text-warning',
  assinada: 'bg-success/10 text-success',
  recusada: 'bg-danger/10 text-danger',
};

@Component({
  selector: 'app-declarations',
  standalone: true,
  imports: [DatePipe, NgClass, FormsModule, IconComponent, ModalComponent],
  templateUrl: './declarations.component.html',
})
export class DeclarationsComponent {
  readonly tipos: DeclaracaoTipo[] = ['serviço', 'efectividade', 'rendimentos'];
  readonly minhas = computed(() => this.declarations.doUtilizador(this.auth.currentUser()?.id ?? ''));
  readonly pedidoAberto = signal(false);
  readonly emVisualizacao = signal<Declaracao | null>(null);
  readonly aAssinar = signal<string | null>(null);
  readonly verificacao = signal<{ valida: boolean; declaracao?: Declaracao } | null>(null);

  pedido = { tipo: 'serviço' as DeclaracaoTipo, finalidade: '' };
  codigo = '';

  constructor(
    readonly auth: AuthService,
    readonly declarations: DeclarationsService,
    readonly users: UsersService
  ) {}

  classeEstado(e: DeclaracaoEstado): string {
    return ESTADO_CLASS[e];
  }

  pedir(): void {
    const u = this.auth.currentUser();
    if (!u || !this.pedido.finalidade.trim()) return;
    this.declarations.pedir(this.pedido.tipo, this.pedido.finalidade.trim(), u.id);
    this.pedido = { tipo: 'serviço', finalidade: '' };
    this.pedidoAberto.set(false);
  }

  async assinar(d: Declaracao): Promise<void> {
    const u = this.auth.currentUser();
    if (!u) return;
    this.aAssinar.set(d.id);
    await this.declarations.assinar(d.id, u);
    this.aAssinar.set(null);
  }

  async verificar(): Promise<void> {
    this.verificacao.set(await this.declarations.verificar(this.codigo));
  }

  imprimir(): void {
    window.print();
  }
}
