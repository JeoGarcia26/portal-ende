import { Injectable, computed, signal } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { Permissao, ROLE_PERMISSIONS, User } from '../../models';
import { MOCK_USERS } from '../../shared/data/mock-users';
import { UsersService } from './users.service';

const STORAGE_KEY = 'ende_portal_session';
const TOKEN_KEY = 'ende_portal_token';

/**
 * TODO(backend): esta implementação é 100% mock (localStorage + array em memória).
 * Quando o endpoint estiver disponível:
 *   1. Injectar HttpClient e substituir `login()` por
 *      `this.http.post<{ user: User; token: string }>(API_ENDPOINTS.auth.login, { numeroMecanografico, password })`
 *   2. Manter `setSession()` a gravar o token em TOKEN_KEY — o authInterceptor
 *      (core/interceptors/auth.interceptor.ts) já está activo e lê esse valor.
 *   3. Substituir `restoreSession()` por uma chamada a GET /auth/me usando o
 *      token guardado, em vez de reler o localStorage directamente.
 *   4. Os privilégios (`can`) devem ser SEMPRE validados também no servidor.
 * A assinatura pública (login/setSession/logout/currentUser/can) não muda.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly sessionIdSignal = signal<string | null>(this.restoreSession());

  /** Lido do directório, para que mudanças de papel/cargo se reflictam de imediato. */
  readonly currentUser = computed(() => this.users.byId(this.sessionIdSignal() ?? undefined) ?? null);
  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  /** Mantido por compatibilidade: quem pode publicar conteúdos. */
  readonly isGestor = computed(() => this.can('conteudo.publicar'));

  constructor(private readonly users: UsersService) {}

  can(p: Permissao): boolean {
    const role = this.currentUser()?.role;
    return !!role && ROLE_PERMISSIONS[role].includes(p);
  }

  login(numeroMecanografico: string, password: string): Observable<User> {
    const found = MOCK_USERS.find(
      (u) =>
        u.numeroMecanografico.toUpperCase() === numeroMecanografico.trim().toUpperCase() &&
        u.password === password
    );
    const user = found && this.users.byId(found.id);

    if (!user) {
      return throwError(
        () => new Error('Credenciais inválidas. Verifica o número mecanográfico e a palavra-passe.')
      ).pipe(delay(500));
    }

    return of({ ...user, ultimoLogin: new Date().toISOString() }).pipe(delay(600));
  }

  setSession(user: User, token = 'mock-token'): void {
    this.sessionIdSignal.set(user.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, token); // TODO(backend): usar o token real devolvido pelo login
  }

  logout(): void {
    this.sessionIdSignal.set(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }

  private restoreSession(): string | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as User).id : null;
    } catch {
      return null;
    }
  }
}
