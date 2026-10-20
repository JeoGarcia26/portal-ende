import { WritableSignal, effect, signal } from '@angular/core';

/**
 * Signal gravado automaticamente no localStorage a cada alteração (RF1 e modo offline:
 * o último conteúdo carregado fica disponível sem rede). Chamar em contexto de injecção.
 * shortcut: localStorage (~5 MB, por browser) — com backend, a cópia offline passa a ser
 * a cache do service worker (ngsw-config.json → dataGroups) e isto fica só como fallback.
 */
export function persistedSignal<T>(key: string, initial: T): WritableSignal<T> {
  const storageKey = 'ende_portal_' + key;
  let start = initial;
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) start = JSON.parse(raw) as T;
  } catch {
    /* storage indisponível ou corrompido — usa o valor inicial */
  }
  const s = signal<T>(start);
  effect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(s()));
    } catch {
      /* quota cheia: os dados continuam em memória nesta sessão */
    }
  });
  return s;
}

export const novoId = (prefixo: string) => prefixo + '-' + Math.random().toString(36).slice(2, 8);
