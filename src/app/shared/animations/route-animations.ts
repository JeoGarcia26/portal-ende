import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

/** Transição subtil aplicada à troca de página (fade + leve deslocamento vertical). */
export const routeFade = trigger('routeFade', [
  transition('* <=> *', [
    query(':enter', [style({ opacity: 0, transform: 'translateY(8px)' })], { optional: true }),
    query(':leave', [style({ position: 'absolute', width: '100%' })], { optional: true }),
    group([
      query(':leave', [animate('160ms cubic-bezier(.4,0,1,1)', style({ opacity: 0 }))], { optional: true }),
      query(
        ':enter',
        [animate('280ms 60ms cubic-bezier(.16,1,.3,1)', style({ opacity: 1, transform: 'translateY(0)' }))],
        { optional: true }
      ),
    ]),
  ]),
]);

/** Entrada escalonada para listas de cartões (notícias, comunicados, serviços...). */
export const listStagger = trigger('listStagger', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '260ms cubic-bezier(.16,1,.3,1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ],
      { optional: true }
    ),
  ]),
]);
