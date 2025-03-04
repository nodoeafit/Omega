import { Routes } from '@angular/router';

import { HomeStudentComponent } from './students-dashboard/home-student/home-student.component';
import { CourseContentComponent } from './students-dashboard/course-content/course-content.component';
import { DashboardComponent } from './Dashboard_Mentor/dashboard.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { CoursesPageComponent } from './Pages/courses-page/courses-page.component';
import { SignupPageComponent } from './Pages/signup-page/signup-page.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { HomelayoutComponent } from './layout/homelayout/homelayout.component';
import { MoreCoursesComponent } from './students-dashboard/more-courses/more-courses.component';
import { CoursesDetailsComponent } from './students-dashboard/more-courses/courses-details/courses-details.component';
import path from 'path';
import { Component } from '@angular/core';
import { SidecontentComponent } from './sidecontent/sidecontent.component';
import { MainLayoutComponent } from './Pages/main-layout/main-layout.component';

export const routes: Routes = [
  // {
  //   path: 'home',
  //   data: { renderMode: 'client' },
  //   component: HomeLayoutComponent,
  //   children: [
  //     {
  //       path: 'home-student',
  //       data: { renderMode: 'client' },
  //       component: HomeStudentComponent,
  //       children:  [
  //         {
  //           path: 'more-courses',
  //           data: { renderMode: 'client' },
  //           loadComponent: () =>
  //             import(
  //               './students-dashboard/more-courses/more-courses.component'
  //             ).then((i) => i.MoreCoursesComponent),
  //         },
  //       ],
  //     },
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
  }, //   ],
  // },

  //Dashboard mentor
  {
    path: 'dashboard_mentor',
    data: { renderMode: 'client' },
    component: DashboardComponent,
  },
  //Home Student Component
  // {
  //   path: 'home-student',
  //   data: { renderMode: 'client' },
  //   title: 'Home - Student',
  //   component: HomeStudentComponent,
  // },
  {
    path: 'dashboard_mentor',
    data: { renderMode: 'client' },
    component: DashboardComponent,
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
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        data: { renderMode: 'client' },
        loadComponent: () =>
          import(
            './components/admin-course-components/admin-dashboard/admin-dashboard.component'
          ).then((m) => m.AdminDashboardComponent),
        // canActivate: [AuthGuard]
      },
      {
        path: 'courses',
        data: { renderMode: 'client' },
        loadComponent: () =>
          import(
            './components/admin-course-components/admin-course-list/admin-course-list.component'
          ).then((m) => m.AdminCourseListComponent),
        //canActivate: [AuthGuard]
      },
      {
        path: 'courses/new',
        data: { renderMode: 'client' },
        loadComponent: () =>
          import(
            './components/admin-course-components/admin-course-form/admin-course-form.component'
          ).then((m) => m.AdminCourseFormComponent),
        //canActivate: [AuthGuard]
      },
      {
        path: 'courses/edit-view/:id',
        data: { renderMode: 'client' },
        loadComponent: () =>
          import(
            './components/admin-course-components/admin-course-form/admin-course-form.component'
          ).then((m) => m.AdminCourseFormComponent),
        //canActivate: [AuthGuard]
      },
      {
        path: 'courses/edit-content/:id',
        data: { renderMode: 'client' },
        loadComponent: () =>
          import(
            './components/admin-course-components/admin-course-editor/course-editor.component'
          ).then((m) => m.CourseEditorComponent),
      },
      {
        path: 'login',
        data: { renderMode: 'client' },
        loadComponent: () =>
          import(
            './components/admin-course-components/login/login.component'
          ).then((m) => m.LoginComponent),
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
    ],
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
  //Default path
  {
    path: '',
    data: { renderMode: 'client' },
    redirectTo: 'landing',
    pathMatch: 'full',
  }, // Redirige la raíz a la landing page
  {
    path: 'landing',
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
];
