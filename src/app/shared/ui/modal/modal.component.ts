import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 animate-fade-in bg-ink/50 backdrop-blur-[2px]" (click)="close.emit()"></div>
      <div
        class="relative w-full animate-fade-in overflow-hidden rounded-card border border-border bg-surface-raised shadow-card-hover"
        [style.max-width]="maxWidth"
      >
        <div class="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 class="font-display text-[15px] font-semibold tracking-tight text-ink">{{ title }}</h3>
          <button type="button" (click)="close.emit()" class="rounded-control p-1.5 text-muted hover:bg-surface-alt hover:text-ink">
            <app-icon name="X" [size]="17" />
          </button>
        </div>
        <div class="max-h-[75vh] overflow-y-auto px-5 py-5">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class ModalComponent {
  @Input() title = '';
  @Input() maxWidth = '32rem';
  @Output() close = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close.emit();
  }
}
