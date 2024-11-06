import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { AuthService, LoginResponse } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onLogin() {
    const { email, password } = this.loginForm.value; 
    this.authService.login(email, password).subscribe(
      (response: LoginResponse) => {
        console.log('Login successful', response);
        if (response.type === 'ADMIN') {
          this.router.navigate(['/Admin'],{ queryParams: { id: response.id } }); 
        }else if(response.type === 'DONAR') {
          this.router.navigate(['/Donar-Home'],{ queryParams: { id: response.id } }); 
        }else if(response.type === 'HOSPITAL') {
          this.router.navigate(['/Hospital'],{ queryParams: { id: response.id } }); 
        }
      },
      error => {
        Swal.fire({
          title: 'Error!',
          text: 'Login failed. Please check your credentials.',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      }
    );
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Navigate to login page after logout
  }
}