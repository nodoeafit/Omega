import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminCursoListComponent } from './components/admin-curso-list/admin-curso-list.component';
import { AdminCursoFormComponent } from './components/admin-curso-form/admin-curso-form.component';
import { DashboardComponent } from './Dashboard_Mentor/dashboard.component';
import { VistaCursosComponent } from './vista-cursos/vista-cursos.component';

export const routes: Routes = [
  {
    path:"",
    component:VistaCursosComponent
  },

    {path: 'dashboard_mentor', component: DashboardComponent},

  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'cursos', component: AdminCursoListComponent },
  { path: 'cursos/nuevo', component: AdminCursoFormComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
