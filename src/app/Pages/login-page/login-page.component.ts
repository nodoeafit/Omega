import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    this.errorMessage = '';
    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        // Redirect based on user type
        switch (user.user_type) {
          case 'Estudiante':
            this.router.navigate(['/home-student']);
            break;
          case 'Admin':
            this.router.navigate(['/admin-dashboard']);
            break;
          case 'Mentor':
            this.router.navigate(['/dashboard_mentor']);
            break;
          default:
            this.errorMessage = 'Invalid user type';
        }
      },
      error: (error) => {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
