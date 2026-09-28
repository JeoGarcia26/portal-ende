import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentsService } from '../../core/services/documents.service';
import { AuthService } from '../../core/services/auth.service';
import { CompanyDocument, DocumentoCategoria, DocumentoTipo } from '../../models';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { ModalComponent } from '../../shared/ui/modal/modal.component';
import { listStagger } from '../../shared/animations/route-animations';
import { AppIconName } from '../../shared/ui/icon/icons';

const ICON_BY_TIPO: Record<string, AppIconName> = {
  pdf: 'FileText',
  docx: 'FileText',
  xlsx: 'FileText',
  pptx: 'Presentation',
  imagem: 'FileText',
  outro: 'FileText',
};

const CATEGORIAS: DocumentoCategoria[] = ['políticas', 'formulários', 'manuais', 'financeiro', 'rh', 'segurança'];

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, ModalComponent],
  templateUrl: './documents.component.html',
  animations: [listStagger],
})
export class DocumentsComponent {
  readonly filtro = signal<DocumentoCategoria | 'todas'>('todas');
  readonly categoriasBase = CATEGORIAS;
  readonly modalAberto = signal(false);
  readonly ficheiroSelecionado = signal<File | null>(null);

  form = this.formVazio();

  constructor(
    readonly documents: DocumentsService,
    readonly auth: AuthService
  ) {}

  get filtrados() {
    const f = this.filtro();
    return this.documents.items().filter((d) => f === 'todas' || d.categoria === f);
  }

  get categorias(): DocumentoCategoria[] {
    return Array.from(new Set(this.documents.items().map((d) => d.categoria)));
  }

  icone(tipo: string): AppIconName {
    return ICON_BY_TIPO[tipo] ?? 'FileText';
  }

  formatarTamanho(kb: number): string {
    return kb >= 1024 ? (kb / 1024).toFixed(1) + ' MB' : kb + ' KB';
  }

  private formVazio() {
    return {
      nome: '',
      descricao: '',
      categoria: 'políticas' as DocumentoCategoria,
      versao: '1.0',
    };
  }

  abrirNovo(): void {
    this.form = this.formVazio();
    this.ficheiroSelecionado.set(null);
    this.modalAberto.set(true);
  }

  aoSelecionarFicheiro(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const ficheiro = input.files?.[0] ?? null;
    this.ficheiroSelecionado.set(ficheiro);
    if (ficheiro && !this.form.nome) {
      this.form.nome = ficheiro.name.replace(/\.[^/.]+$/, '');
    }
  }

  private tipoPorExtensao(nome: string): DocumentoTipo {
    const ext = nome.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'pdf';
    if (ext === 'docx' || ext === 'doc') return 'docx';
    if (ext === 'xlsx' || ext === 'xls') return 'xlsx';
    if (ext === 'pptx' || ext === 'ppt') return 'pptx';
    if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext ?? '')) return 'imagem';
    return 'outro';
  }

  guardar(): void {
    const ficheiro = this.ficheiroSelecionado();
    // TODO(backend): trocar por upload real (multipart/form-data para /uploads),
    // guardando o URL devolvido pelo servidor em `url`. De momento simula-se
    // com um object URL local, válido apenas nesta sessão do browser.
    const url = ficheiro ? URL.createObjectURL(ficheiro) : '#';
    const tamanhoKb = ficheiro ? Math.max(1, Math.round(ficheiro.size / 1024)) : 0;
    const tipo = ficheiro ? this.tipoPorExtensao(ficheiro.name) : 'outro';

    this.documents.create({
      ...this.form,
      tipo,
      tamanhoKb,
      url,
      dataAtualizacao: new Date().toISOString(),
    });
    this.modalAberto.set(false);
  }

  remover(d: CompanyDocument): void {
    if (confirm(`Remover o documento "${d.nome}"?`)) {
      this.documents.remove(d.id);
    }
  }
}
