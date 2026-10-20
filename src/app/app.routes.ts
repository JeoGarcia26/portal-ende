import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';
import { permissionGuard } from './core/guards/permission.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./shared/layout/shell/shell.component').then((m) => m.ShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'inicio' },
      {
        path: 'inicio',
        data: { animation: 'inicio' },
        loadComponent: () => import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'noticias',
        data: { animation: 'noticias' },
        loadComponent: () => import('./features/news/list/news-list.component').then((m) => m.NewsListComponent),
      },
      {
        path: 'noticias/:id',
        data: { animation: 'noticia-detalhe' },
        loadComponent: () =>
          import('./features/news/detail/news-detail.component').then((m) => m.NewsDetailComponent),
      },
      {
        path: 'comunicados',
        data: { animation: 'comunicados' },
        loadComponent: () =>
          import('./features/announcements/announcements.component').then((m) => m.AnnouncementsComponent),
      },
      {
        path: 'servicos',
        data: { animation: 'servicos' },
        loadComponent: () => import('./features/services/services.component').then((m) => m.ServicesComponent),
      },
      {
        path: 'suporte',
        data: { animation: 'suporte' },
        loadComponent: () => import('./features/support/support.component').then((m) => m.SupportComponent),
      },
      {
        path: 'eventos',
        data: { animation: 'eventos' },
        loadComponent: () => import('./features/events/events.component').then((m) => m.EventsComponent),
      },
      {
        path: 'documentos',
        data: { animation: 'documentos' },
        loadComponent: () => import('./features/documents/documents.component').then((m) => m.DocumentsComponent),
      },
      {
        path: 'sobre',
        data: { animation: 'sobre' },
        loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'centros',
        data: { animation: 'centros' },
        loadComponent: () => import('./features/centers/centers.component').then((m) => m.CentersComponent),
      },
      {
        path: 'reconhecimento',
        data: { animation: 'reconhecimento' },
        loadComponent: () => import('./features/recognition/recognition.component').then((m) => m.RecognitionComponent),
      },
      {
        path: 'departamentos',
        data: { animation: 'departamentos' },
        loadComponent: () => import('./features/departments/departments.component').then((m) => m.DepartmentsComponent),
      },
      {
        path: 'declaracoes',
        data: { animation: 'declaracoes' },
        loadComponent: () => import('./features/declarations/declarations.component').then((m) => m.DeclarationsComponent),
      },
      {
        path: 'satisfacao',
        data: { animation: 'satisfacao' },
        canActivate: [permissionGuard('satisfacao.ver')],
        loadComponent: () => import('./features/satisfaction/satisfaction-results.component').then((m) => m.SatisfactionResultsComponent),
      },
      {
        path: 'admin/privilegios',
        data: { animation: 'privilegios' },
        canActivate: [permissionGuard('utilizadores.gerir')],
        loadComponent: () => import('./features/admin/privileges.component').then((m) => m.PrivilegesComponent),
      },
      {
        path: 'perfil',
        data: { animation: 'perfil' },
        loadComponent: () => import('./features/profile/profile.component').then((m) => m.ProfileComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'inicio' },
];
