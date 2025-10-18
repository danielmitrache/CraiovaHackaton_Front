import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

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

    // TODO: Implement actual authentication logic
    setTimeout(() => {
      this.isLoading = false;
      console.log('Login attempt:', {
        email: this.email,
        keepSignedIn: this.keepSignedIn
      });

      // Simulate successful login
      alert('🎉 Welcome back! Your car misses you.');
      this.router.navigate(['/main-page']);
    }, 1500);
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
    console.log('Navigate to sign up');
    alert('🚗 Sign up page coming soon!');
  }

  /**
   * Navigate to forgot password page
   */
  onForgotPassword(): void {
    console.log('Navigate to forgot password');
    alert('🔑 Password recovery coming soon!');
  }

  /**
   * Navigate back to main page
   */
  onBackToHome(): void {
    this.router.navigate(['/main-page']);
  }
}

