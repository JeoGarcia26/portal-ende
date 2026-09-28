import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { IconComponent } from '../../../shared/ui/icon/icon.component';

const NUMERO_MECANOGRAFICO_PATTERN = /^NM\d{5}$/i;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  numeroMecanografico = 'NM10234';
  password = 'ende2026';
  showPassword = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  submit(): void {
    this.error.set(null);

    const numero = this.numeroMecanografico.trim();
    if (!NUMERO_MECANOGRAFICO_PATTERN.test(numero)) {
      this.error.set('Número mecanográfico inválido. Formato esperado: NM seguido de 5 dígitos (ex: NM10234).');
      return;
    }

    this.loading.set(true);
    this.auth.login(numero, this.password).subscribe({
      next: (user) => {
        this.auth.setSession(user);
        this.loading.set(false);
        this.router.navigateByUrl('/inicio');
      },
      error: (err: Error) => {
        this.loading.set(false);
        this.error.set(err.message);
      },
    });
  }
}
