import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnnouncementsService } from '../../core/services/announcements.service';
import { AuthService } from '../../core/services/auth.service';
import { Announcement, AnnouncementTipo, Prioridade } from '../../models';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { ModalComponent } from '../../shared/ui/modal/modal.component';
import { listStagger } from '../../shared/animations/route-animations';
import { AppIconName } from '../../shared/ui/icon/icons';

const TIPOS: AnnouncementTipo[] = ['aviso', 'manutenção', 'evento', 'rh', 'segurança'];
const PRIORIDADES: Prioridade[] = ['baixa', 'normal', 'alta', 'urgente'];

const ICON_BY_TIPO: Record<AnnouncementTipo, AppIconName> = {
  aviso: 'Info',
  manutenção: 'Wrench',
  evento: 'PartyPopper',
  rh: 'Users',
  segurança: 'ShieldCheck',
};

const PRIORITY_CLASS: Record<Prioridade, string> = {
  baixa: 'bg-surface-alt text-ink-soft',
  normal: 'bg-primary-light text-primary-dark',
  alta: 'bg-warning/10 text-warning',
  urgente: 'bg-danger/10 text-danger',
};

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, ModalComponent],
  templateUrl: './announcements.component.html',
  animations: [listStagger],
})
export class AnnouncementsComponent {
  readonly tipos = TIPOS;
  readonly prioridades = PRIORIDADES;
  readonly modalAberto = signal(false);
  readonly emEdicao = signal<Announcement | null>(null);

  form = this.formVazio();

  constructor(
    readonly announcements: AnnouncementsService,
    readonly auth: AuthService
  ) {}

  iconeDe(tipo: AnnouncementTipo): AppIconName {
    return ICON_BY_TIPO[tipo];
  }

  classePrioridade(p: Prioridade): string {
    return PRIORITY_CLASS[p];
  }

  private formVazio() {
    return {
      titulo: '',
      mensagem: '',
      tipo: 'aviso' as AnnouncementTipo,
      prioridade: 'normal' as Prioridade,
      fixado: false,
    };
  }

  abrirNovo(): void {
    this.emEdicao.set(null);
    this.form = this.formVazio();
    this.modalAberto.set(true);
  }

  abrirEdicao(a: Announcement): void {
    this.emEdicao.set(a);
    this.form = { titulo: a.titulo, mensagem: a.mensagem, tipo: a.tipo, prioridade: a.prioridade, fixado: a.fixado };
    this.modalAberto.set(true);
  }

  guardar(): void {
    const user = this.auth.currentUser();
    const editando = this.emEdicao();
    if (editando) {
      this.announcements.update(editando.id, { ...this.form });
    } else {
      this.announcements.create({
        ...this.form,
        autor: { id: user?.id ?? 'u-000', nome: user?.nome ?? 'Utilizador', cargo: user?.cargo },
        dataPublicacao: new Date().toISOString(),
      });
    }
    this.modalAberto.set(false);
  }

  remover(a: Announcement): void {
    if (confirm(`Remover o comunicado "${a.titulo}"?`)) {
      this.announcements.remove(a.id);
    }
  }
}
