import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css']
})
export class LoginPageComponent {
  email = '';
  password = '';
  keepSignedIn = false;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    private logger: LoggerService
  ) {}

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    this.errorMessage = '';

    // Basic validation
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    this.isLoading = true;
    this.logger.info('Login attempt started', { email: this.email });

    // Call authentication service
    this.authService.login({
      email: this.email,
      password: this.password,
      keepSignedIn: this.keepSignedIn
    }).subscribe({
      next: (response) => {
        this.isLoading = false;

        if (response.success) {
          this.logger.info('Login successful', { email: this.email });

          // Store authentication token
          if (response.token) {
            this.authService.storeToken(response.token);
          }

          // Show success toast
          this.toastService.success(response.message);

          // Navigate to main page
          setTimeout(() => {
            this.router.navigate(['/main-page']);
          }, 500);
        } else {
          this.errorMessage = response.message || 'Login failed';
          this.toastService.error(this.errorMessage);
          this.logger.warn('Login failed', { reason: response.message });
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Login failed. Please check your credentials.';
        this.toastService.error(this.errorMessage);
        this.logger.error('Login error', error);
      }
    });
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Navigate to sign up page
   */
  onSignUp(): void {
    this.logger.debug('Navigate to sign up');
    this.router.navigate(['/register']);
  }

  /**
   * Navigate to forgot password page
   */
  onForgotPassword(): void {
    this.logger.debug('Forgot password clicked');
    this.toastService.info('Password recovery feature coming soon!');
  }

  /**
   * Navigate back to main page
   */
  onBackToHome(): void {
    this.router.navigate(['/main-page']);
  }
}
