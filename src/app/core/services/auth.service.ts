import { Injectable, computed, signal } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { User } from '../../models';
import { MOCK_USERS } from '../../shared/data/mock-users';

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
 * A assinatura pública (login/setSession/logout/currentUser) não muda, pelo
 * que nenhum componente precisa de ser alterado.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUserSignal = signal<User | null>(this.restoreSession());

  readonly currentUser = computed(() => this.currentUserSignal());
  readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);
  readonly isGestor = computed(() => {
    const user = this.currentUserSignal();
    return user?.role === 'gestor' || user?.role === 'admin';
  });

  login(numeroMecanografico: string, password: string): Observable<User> {
    const found = MOCK_USERS.find(
      (u) =>
        u.numeroMecanografico.toUpperCase() === numeroMecanografico.trim().toUpperCase() &&
        u.password === password
    );

    if (!found) {
      return throwError(
        () => new Error('Credenciais inválidas. Verifica o número mecanográfico e a palavra-passe.')
      ).pipe(delay(500));
    }

    const { password: _pw, ...user } = found;
    return of(user).pipe(delay(600));
  }

  setSession(user: User, token = 'mock-token'): void {
    this.currentUserSignal.set(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, token); // TODO(backend): usar o token real devolvido pelo login
  }

  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }

  private restoreSession(): User | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }
}
