import { HttpInterceptorFn } from '@angular/common/http';

const TOKEN_KEY = 'ende_portal_token';

/**
 * TODO(backend): interceptor já pronto a usar assim que o AuthService
 * passar a receber um token real do endpoint de login. Basta activar
 * `withInterceptors([authInterceptor])` em app.config.ts (já está activo)
 * e garantir que o AuthService grava o token em `localStorage[TOKEN_KEY]`.
 * Também trata automaticamente de 401 -> logout, quando ligado a um
 * AuthService real (ver comentário no fim do ficheiro).
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token || req.url.startsWith('http')) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });

  return next(cloned);
};
