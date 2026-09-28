import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventsService } from '../../core/services/events.service';
import { AuthService } from '../../core/services/auth.service';
import { CompanyEvent, EventoTipo } from '../../models';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { ModalComponent } from '../../shared/ui/modal/modal.component';
import { listStagger } from '../../shared/animations/route-animations';
import { AppIconName } from '../../shared/ui/icon/icons';

const TIPOS: EventoTipo[] = ['formação', 'institucional', 'social', 'reunião', 'feriado'];

const ICON_BY_TIPO: Record<EventoTipo, AppIconName> = {
  formação: 'GraduationCap',
  institucional: 'Building2',
  social: 'PartyPopper',
  reunião: 'Users',
  feriado: 'CalendarDays',
};

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, ModalComponent],
  templateUrl: './events.component.html',
  animations: [listStagger],
})
export class EventsComponent {
  readonly tipos = TIPOS;
  readonly modalAberto = signal(false);
  readonly emEdicao = signal<CompanyEvent | null>(null);

  form = this.formVazio();

  constructor(
    readonly events: EventsService,
    readonly auth: AuthService
  ) {}

  iconeDe(tipo: EventoTipo): AppIconName {
    return ICON_BY_TIPO[tipo];
  }

  private formVazio() {
    const agora = new Date().toISOString().slice(0, 16);
    return {
      titulo: '',
      descricao: '',
      tipo: 'institucional' as EventoTipo,
      dataInicio: agora,
      dataFim: agora,
      local: '',
      online: false,
      vagasTotal: undefined as number | undefined,
      vagasOcupadas: 0,
    };
  }

  abrirNovo(): void {
    this.emEdicao.set(null);
    this.form = this.formVazio();
    this.modalAberto.set(true);
  }

  abrirEdicao(e: CompanyEvent): void {
    this.emEdicao.set(e);
    this.form = {
      titulo: e.titulo,
      descricao: e.descricao,
      tipo: e.tipo,
      dataInicio: e.dataInicio.slice(0, 16),
      dataFim: e.dataFim.slice(0, 16),
      local: e.local,
      online: !!e.online,
      vagasTotal: e.vagasTotal,
      vagasOcupadas: e.vagasOcupadas ?? 0,
    };
    this.modalAberto.set(true);
  }

  guardar(): void {
    const payload = {
      ...this.form,
      dataInicio: new Date(this.form.dataInicio).toISOString(),
      dataFim: new Date(this.form.dataFim).toISOString(),
    };
    const editando = this.emEdicao();
    if (editando) {
      this.events.update(editando.id, payload);
    } else {
      this.events.create(payload);
    }
    this.modalAberto.set(false);
  }

  remover(e: CompanyEvent): void {
    if (confirm(`Remover o evento "${e.titulo}"?`)) {
      this.events.remove(e.id);
    }
  }
}
