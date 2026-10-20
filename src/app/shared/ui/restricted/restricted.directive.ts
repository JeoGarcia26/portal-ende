import { Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

/**
 * RF3 — conteúdo de uso restrito. Uso: <div [appRestrito]="item.restrito">.
 * Bloqueia selecção, cópia, menu de contexto, arrastar e impressão; esconde o conteúdo quando a
 * janela perde o foco ou se prime PrintScreen; aplica marca d'água com nome, nº mecanográfico e data.
 * shortcut: nenhum browser consegue impedir capturas de ecrã (telemóvel, ferramenta do SO). A marca
 * d'água torna qualquer fuga rastreável até à pessoa — é esse o controlo real. Para bloqueio efectivo
 * só uma app nativa/MDM. Fica registado para a resposta à Q2 da DIR.
 */
@Directive({
  selector: '[appRestrito]',
  standalone: true,
})
export class RestrictedDirective implements OnInit, OnDestroy {
  @Input() appRestrito: boolean | undefined = false;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly auth = inject(AuthService);
  private watermark?: HTMLElement;

  @HostBinding('class.conteudo-restrito') get activo() {
    return !!this.appRestrito;
  }

  ngOnInit(): void {
    if (!this.appRestrito) return;
    const u = this.auth.currentUser();
    const marca = `${u?.nome ?? ''} · ${u?.numeroMecanografico ?? ''} · ${new Date().toLocaleString('pt-AO')}`;
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='340' height='160'><text x='10' y='90' transform='rotate(-20 170 80)' font-family='sans-serif' font-size='13' fill='rgba(20,21,23,0.09)'>${marca.replace(/[<&'"]/g, '')}</text></svg>`;
    this.watermark = this.renderer.createElement('div');
    this.renderer.addClass(this.watermark, 'marca-agua');
    this.renderer.setStyle(this.watermark, 'background-image', `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`);
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.appendChild(this.el.nativeElement, this.watermark);
    document.body.classList.add('tem-conteudo-restrito');
  }

  ngOnDestroy(): void {
    if (this.appRestrito && !document.querySelector('.conteudo-restrito')) {
      document.body.classList.remove('tem-conteudo-restrito');
    }
  }

  @HostListener('copy', ['$event'])
  @HostListener('cut', ['$event'])
  @HostListener('contextmenu', ['$event'])
  @HostListener('dragstart', ['$event'])
  bloquear(e: Event): void {
    if (this.appRestrito) e.preventDefault();
  }

  @HostListener('window:blur')
  @HostListener('document:visibilitychange')
  ocultar(): void {
    if (this.appRestrito) this.el.nativeElement.classList.add('restrito-oculto');
  }

  @HostListener('window:focus')
  mostrar(): void {
    this.el.nativeElement.classList.remove('restrito-oculto');
  }

  @HostListener('document:keyup', ['$event'])
  teclas(e: KeyboardEvent): void {
    if (!this.appRestrito) return;
    if (e.key === 'PrintScreen') {
      navigator.clipboard?.writeText('Conteúdo de uso restrito — ENDE').catch(() => {});
      this.ocultar();
      setTimeout(() => this.mostrar(), 1500);
    }
  }

  @HostListener('document:keydown', ['$event'])
  atalhos(e: KeyboardEvent): void {
    // Ctrl/Cmd + P (imprimir), S (guardar), C (copiar)
    if (this.appRestrito && (e.ctrlKey || e.metaKey) && ['p', 's', 'c'].includes(e.key.toLowerCase())) e.preventDefault();
  }
}
