import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-page.html',
  styleUrls: ['./register-page.css']
})
export class RegisterPageComponent {
  accountType: 'user' | 'service' = 'user';
  fullName = '';
  serviceName = '';
  serviceCUI = '';
  location = '';
  email = '';
  password = '';
  confirmPassword = '';
  agreeToTerms = false;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(private router: Router) {}

  /**
   * Set account type
   */
  setAccountType(type: 'user' | 'service'): void {
    this.accountType = type;
    this.errorMessage = '';
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Toggle confirm password visibility
   */
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    this.errorMessage = '';

    // Basic validation based on account type
    if (this.accountType === 'user') {
      if (!this.fullName || !this.email || !this.password || !this.confirmPassword) {
        this.errorMessage = 'Please fill in all fields';
        return;
      }
    } else {
      if (!this.serviceName || !this.serviceCUI || !this.location || !this.email || !this.password || !this.confirmPassword) {
        this.errorMessage = 'Please fill in all fields';
        return;
      }
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (!this.agreeToTerms) {
      this.errorMessage = 'Please agree to the terms and conditions';
      return;
    }

    this.isLoading = true;


    setTimeout(() => {
      this.isLoading = false;
      console.log('Registration attempt:', {
        accountType: this.accountType,
        ...(this.accountType === 'user' ? { fullName: this.fullName } : { serviceName: this.serviceName, serviceCUI: this.serviceCUI, location: this.location }),
        email: this.email
      });

      // Simulate successful registration
      const message = this.accountType === 'user'
        ? '🎉 Welcome aboard! Your account has been created.'
        : '🎉 Welcome! Your service account has been created.';
      alert(message);
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
   * Navigate to login page
   */
  onLogin(): void {
    console.log('Navigate to login');
    this.router.navigate(['/login']);
  }

  /**
   * Navigate back to main page
   */
  onBackToHome(): void {
    this.router.navigate(['/main-page']);
  }
}
