import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicesCatalogService } from '../../core/services/services-catalog.service';
import { AuthService } from '../../core/services/auth.service';
import { ServiceCategoria, ServiceItem } from '../../models';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { ModalComponent } from '../../shared/ui/modal/modal.component';
import { listStagger } from '../../shared/animations/route-animations';
import { AppIconName } from '../../shared/ui/icon/icons';

const CATEGORIAS: ServiceCategoria[] = ['rh', 'ti', 'financeiro', 'logística', 'jurídico', 'geral'];
const ICONES_DISPONIVEIS: AppIconName[] = [
  'CalendarDays', 'FileText', 'Wrench', 'FolderOpen', 'Shield', 'HeartHandshake',
  'Presentation', 'GraduationCap', 'Briefcase', 'Users', 'Mail', 'Settings',
];

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, ModalComponent],
  templateUrl: './services.component.html',
  animations: [listStagger],
})
export class ServicesComponent {
  readonly categorias = CATEGORIAS;
  readonly icones = ICONES_DISPONIVEIS;
  readonly filtro = signal<ServiceCategoria | 'todas'>('todas');
  readonly modalAberto = signal(false);
  readonly emEdicao = signal<ServiceItem | null>(null);

  form = this.formVazio();

  constructor(
    readonly catalog: ServicesCatalogService,
    readonly auth: AuthService
  ) {}

  get filtrados(): ServiceItem[] {
    const f = this.filtro();
    return this.catalog.items().filter((s) => f === 'todas' || s.categoria === f);
  }

  private formVazio() {
    return {
      nome: '',
      descricao: '',
      categoria: 'geral' as ServiceCategoria,
      icone: 'Briefcase' as AppIconName,
      link: '/suporte',
      popular: false,
    };
  }

  abrirNovo(): void {
    this.emEdicao.set(null);
    this.form = this.formVazio();
    this.modalAberto.set(true);
  }

  abrirEdicao(s: ServiceItem, ev: Event): void {
    ev.stopPropagation();
    this.emEdicao.set(s);
    this.form = { nome: s.nome, descricao: s.descricao, categoria: s.categoria, icone: s.icone as AppIconName, link: s.link, popular: !!s.popular };
    this.modalAberto.set(true);
  }

  guardar(): void {
    const editando = this.emEdicao();
    if (editando) {
      this.catalog.update(editando.id, { ...this.form });
    } else {
      this.catalog.create({ ...this.form });
    }
    this.modalAberto.set(false);
  }

  remover(s: ServiceItem, ev: Event): void {
    ev.stopPropagation();
    if (confirm(`Remover o serviço "${s.nome}"?`)) {
      this.catalog.remove(s.id);
    }
  }
}
