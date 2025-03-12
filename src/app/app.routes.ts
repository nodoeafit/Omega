import { Routes } from '@angular/router';

import { HomeStudentComponent } from './students-dashboard/home-student/home-student.component';
import { DashboardComponent } from './Dashboard_Mentor/dashboard.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { CoursesPageComponent } from './Pages/courses-page/courses-page.component';
import { SignupPageComponent } from './Pages/signup-page/signup-page.component';
import { HomelayoutComponent } from './layout/homelayout/homelayout.component';
import { MainLayoutComponent } from './Pages/main-layout/main-layout.component';

import { CourseContentComponent } from './students-dashboard/course-content/course-content.component';

import { ContainerComponent } from './admin-components/container/container.component';
import { UserFormComponent } from './admin-components/user-form/user-form.component';
import { SearchUserDashboardComponent } from './search-user-dashboard/search-user-dashboard.component';
import { AdminComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDetailComponent } from './admin-components/user-detail/user-detail.component.js';
import { EditUserComponent } from './admin-components/edit-user/edit-user.component.js';
import { AdminGroupComponentComponent } from './admin-group-component/admin-group-component.component';
import { GroupDetailsComponent } from './admin-group-component/group-details/group-details.component.js';

export const routes: Routes = [
  //RUTAS LANDING OK
  {
    path: '',
    data: { renderMode: 'client' },
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        data: { renderMode: 'client' },
        component: LandingPageComponent,
      },
      {
        path: 'login2',
        data: { renderMode: 'client' },
        component: LoginPageComponent,
      },
      {
        path: 'cursos',
        data: { renderMode: 'client' },
        component: CoursesPageComponent,
      },
      {
        path: 'signup',
        data: { renderMode: 'client' },
        component: SignupPageComponent,
      },
    ],
  },
  //admin-dashboard
  {
    path: 'admin-dashboard',
    data: { renderMode: 'client' },
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        data: { renderMode: 'client' },
        redirectTo: 'courses',
        pathMatch: 'full',
      },
      {
        path: 'courses',
        data: { renderMode: 'client' },
        loadComponent: () =>
          import(
            './components/admin-course-components/admin-dashboard/admin-dashboard.component'
          ).then((m) => m.AdminDashboardComponent),
      },
      {
        path: 'courses/new',
        data: { renderMode: 'client' },
        loadComponent: () =>
          import(
            './components/admin-course-components/admin-course-form/admin-course-form.component'
          ).then((m) => m.AdminCourseFormComponent),
      },
      {
        path: 'courses/edit-view/:id',
        data: { renderMode: 'client' },
        loadComponent: () =>
          import(
            './components/admin-course-components/admin-course-form/admin-course-form.component'
          ).then((m) => m.AdminCourseFormComponent),
      },
      {
        path: 'courses/edit-content/:id',
        data: { renderMode: 'client' },
        loadComponent: () =>
          import(
            './components/admin-course-components/admin-course-editor/course-editor.component'
          ).then((m) => m.CourseEditorComponent),
      },
    ],
  },
  {
    path: '',
    component: HomelayoutComponent,
    children: [
      //Dashboard mentor
      {
        path: 'dashboard_mentor',
        data: { renderMode: 'client' },
        component: DashboardComponent,
      },

      //Home Student Component
      {
        path: 'home-student',
        data: { renderMode: 'client' },
        title: 'Home - Student',
        component: HomeStudentComponent,
      },
      // More courses
      {
        path: 'more-courses',
        data: { renderMode: 'client' },
        title: 'More Courses',
        loadComponent: () =>
          import(
            './students-dashboard/more-courses/more-courses.component'
          ).then((m) => m.MoreCoursesComponent),
      },
      //Course content
      {
        path: 'course-content',
        data: { renderMode: 'client' },
        title: 'Content',
        component: CourseContentComponent,
        children: [
          {
            path: 'content',
            data: { renderMode: 'client' },
            loadComponent: () =>
              import(
                './students-dashboard/course-content/content/content.component'
              ).then((m) => m.ContentComponent),
          },
          {
            path: 'learning-tools',
            data: { renderMode: 'client' },
            loadComponent: () =>
              import(
                './students-dashboard/course-content/learning-tools/learning-tools.component'
              ).then((m) => m.LearningToolsComponent),
          },
          {
            path: 'reviews',
            data: { renderMode: 'client' },
            loadComponent: () =>
              import(
                './students-dashboard/course-content/reviews/reviews.component'
              ).then((m) => m.ReviewsComponent),
          },
          {
            path: 'q&a',
            data: { renderMode: 'client' },
            loadComponent: () =>
              import(
                './students-dashboard/course-content/questions-answers/questions-answers.component'
              ).then((m) => m.QuestionsAnswersComponent),
          },
        ],
      },
      // Grades route
      {
        path: 'grades',
        data: { renderMode: 'client' },
        title: 'Grades',
        loadComponent: () =>
          import('./students-dashboard/grades/grades.component').then(
            (m) => m.GradesComponent
          ),
      },
      // Community route
      {
        path: 'community',
        data: { renderMode: 'client' },
        title: 'Community',
        loadComponent: () =>
          import('./students-dashboard/community/community.component').then(
            (m) => m.CommunityComponent
          ),
      },
      {
        path: 'admin',
        data: { renderMode: 'client' },
        component: AdminComponent,
      },
      {
        path: 'admin/user',
        data: { renderMode: 'client' },
        component: SearchUserDashboardComponent,
      },
    
      {
        path: 'admin/adduser',
        data: { renderMode: 'client' },
        component: UserFormComponent,
      },
    
      {
        path: 'admin/user-detail/:id',
        data: { renderMode: 'client' },
        component: UserDetailComponent,
      },
    
      {
        path: 'admin/user-edit/:id',
        data: { renderMode: 'client' },
        component: EditUserComponent,
      },
      {
        path: 'admin/groups',
        data: { renderMode: 'client' },
        component: AdminGroupComponentComponent,
      },
      {
        path: 'admin/groups/id',
        data: { renderMode: 'client' },
        component: GroupDetailsComponent,
      },
    ],
  },
  

];
