import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { AppIconName } from './icons';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [LucideAngularModule],
  template: `<lucide-angular [name]="name" [size]="size" [strokeWidth]="strokeWidth" class="shrink-0"></lucide-angular>`,
})
export class IconComponent {
  @Input({ required: true }) name!: AppIconName;
  @Input() size = 20;
  @Input() strokeWidth = 1.75;
}
