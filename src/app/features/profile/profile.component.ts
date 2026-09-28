import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { SupportService } from '../../core/services/support.service';
import { IconComponent } from '../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  constructor(
    readonly auth: AuthService,
    readonly support: SupportService
  ) {}
}
