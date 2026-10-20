import { Injectable, computed } from '@angular/core';
import { persistedSignal } from '../utils/persisted-signal';
import { Department, User, UserRole } from '../../models';
import { MOCK_USERS } from '../../shared/data/mock-users';
import { MOCK_DEPARTMENTS } from '../../shared/data/mock-departments';

/** Dias até ao próximo aniversário (0 = hoje). Exportado para o teste. */
export function diasAteAniversario(dataNascimento: string, hoje = new Date()): number {
  const [, m, d] = dataNascimento.slice(0, 10).split('-').map(Number);
  const base = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  let prox = new Date(hoje.getFullYear(), m - 1, d);
  if (prox < base) prox = new Date(hoje.getFullYear() + 1, m - 1, d);
  return Math.round((+prox - +base) / 864e5);
}

/**
 * Directório de colaboradores e departamentos integrados no portal.
 * TODO(backend): GET /colaboradores, GET /departamentos, PATCH /colaboradores/:id (papel/cargo).
 */
@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly usersSignal = persistedSignal<User[]>(
    'colaboradores',
    MOCK_USERS.map(({ password: _pw, ...u }) => u)
  );

  readonly users = computed(() => [...this.usersSignal()].sort((a, b) => a.nome.localeCompare(b.nome)));
  readonly departamentos = computed<Department[]>(() => MOCK_DEPARTMENTS);

  readonly aniversariantesHoje = computed(() =>
    this.users().filter((u) => u.dataNascimento && diasAteAniversario(u.dataNascimento) === 0)
  );
  readonly proximosAniversarios = computed(() =>
    this.users()
      .filter((u) => u.dataNascimento && diasAteAniversario(u.dataNascimento) > 0 && diasAteAniversario(u.dataNascimento) <= 30)
      .sort((a, b) => diasAteAniversario(a.dataNascimento!) - diasAteAniversario(b.dataNascimento!))
  );

  byId(id: string | undefined): User | undefined {
    return this.usersSignal().find((u) => u.id === id);
  }

  doDepartamento(depId: string): User[] {
    return this.users().filter((u) => u.departamento.id === depId);
  }

  alterarPapel(id: string, role: UserRole): void {
    this.usersSignal.update((list) => list.map((u) => (u.id === id ? { ...u, role } : u)));
  }

  alterarCargo(id: string, cargo: string): void {
    this.usersSignal.update((list) => list.map((u) => (u.id === id ? { ...u, cargo } : u)));
  }
}
