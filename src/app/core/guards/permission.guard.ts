import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Permissao } from '../../models';
import { AuthService } from '../services/auth.service';

/** Rotas que exigem um privilégio: `canActivate: [permissionGuard('utilizadores.gerir')]`. */
export const permissionGuard =
  (p: Permissao): CanActivateFn =>
  () =>
    inject(AuthService).can(p) || inject(Router).createUrlTree(['/inicio']);
