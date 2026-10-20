import { Component, computed, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { RecognitionService, notaPonderada } from '../../core/services/recognition.service';
import { UsersService, diasAteAniversario } from '../../core/services/users.service';
import { NotificationsService } from '../../core/services/notifications.service';
import { Criterio, DestaqueMes, MudancaCargo, User } from '../../models';
import { CRITERIOS_CENTRO, CRITERIOS_COLABORADOR } from '../../shared/data/mock-culture';
import { AvatarComponent } from '../../shared/ui/avatar/avatar.component';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { ModalComponent } from '../../shared/ui/modal/modal.component';

/** Rubrica "Centro de distribuição do mês e trabalhador do mês" + aniversários + mudanças de cargo. */
@Component({
  selector: 'app-recognition',
  standalone: true,
  imports: [DatePipe, FormsModule, AvatarComponent, IconComponent, ModalComponent],
  templateUrl: './recognition.component.html',
})
export class RecognitionComponent {
  readonly nota = notaPonderada;
  readonly diasAte = diasAteAniversario;
  readonly historico = computed(() => {
    const actuais = [this.recognition.colaboradorDoMes()?.id, this.recognition.centroDoMes()?.id];
    return this.recognition.destaques().filter((d) => !actuais.includes(d.id));
  });
  readonly parabensEnviados = signal<string[]>([]);

  // formulários (RH)
  readonly modal = signal<'eleger' | 'cargo' | null>(null);
  eleicao = this.eleicaoVazia('colaborador');
  cargo = { userId: '', cargoNovo: '' };

  constructor(
    readonly auth: AuthService,
    readonly recognition: RecognitionService,
    readonly users: UsersService,
    private readonly notifications: NotificationsService
  ) {}

  colaborador(id: string | undefined): User | undefined {
    return this.users.byId(id);
  }

  nomeDe(d: DestaqueMes): string {
    return (d.tipo === 'colaborador' ? this.users.byId(d.referenciaId)?.nome : this.recognition.centro(d.referenciaId)?.nome) ?? '—';
  }

  jaFelicitou(m: MudancaCargo): boolean {
    return m.felicitacoes.some((f) => f.userId === this.auth.currentUser()?.id);
  }

  felicitar(m: MudancaCargo): void {
    const u = this.auth.currentUser();
    if (u) this.recognition.felicitar(m.id, u);
  }

  enviarParabens(u: User): void {
    // TODO(backend): POST /colaboradores/:id/parabens — chega ao aniversariante como notificação.
    this.parabensEnviados.update((l) => [...l, u.id]);
    this.notifications.notificar({ titulo: 'Parabéns enviados 🎉', mensagem: `Os seus parabéns foram enviados a ${u.nome}.`, tipo: 'reconhecimento' });
  }

  private eleicaoVazia(tipo: DestaqueMes['tipo']) {
    const base = tipo === 'colaborador' ? CRITERIOS_COLABORADOR : CRITERIOS_CENTRO;
    return {
      tipo,
      mes: new Date().toISOString().slice(0, 7),
      referenciaId: '',
      justificacao: '',
      criterios: base.map((c) => ({ ...c, nota: 8 })) as Criterio[],
    };
  }

  abrirEleicao(tipo: DestaqueMes['tipo']): void {
    this.eleicao = this.eleicaoVazia(tipo);
    this.modal.set('eleger');
  }

  mudarTipoEleicao(tipo: DestaqueMes['tipo']): void {
    this.eleicao = this.eleicaoVazia(tipo);
  }

  guardarEleicao(): void {
    if (!this.eleicao.referenciaId) return;
    this.recognition.eleger({ ...this.eleicao, criterios: this.eleicao.criterios.map((c) => ({ ...c, nota: Math.min(10, Math.max(0, +c.nota)) })) });
    this.modal.set(null);
  }

  guardarCargo(): void {
    this.recognition.registarMudancaCargo(this.cargo.userId, this.cargo.cargoNovo.trim());
    this.cargo = { userId: '', cargoNovo: '' };
    this.modal.set(null);
  }
}
