import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-account.html',
  styleUrls: ['./create-account.css']
})
export class CreateAccountComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  agreeToTerms: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router) {}

  /**
   * Handle form submission
   */
  onSubmit(): void {
    // Reset messages
    this.errorMessage = '';
    this.successMessage = '';

    // Validation
    if (!this.firstName || !this.lastName || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    // Password strength validation
    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long';
      return;
    }

    // Password match validation
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Terms agreement validation
    if (!this.agreeToTerms) {
      this.errorMessage = 'Please agree to the terms and conditions';
      return;
    }

    // Simulate account creation
    this.isLoading = true;
    console.log('🚗 Creating account for:', this.email);

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      this.successMessage = '🎉 Account created successfully! Redirecting to login...';

      // TODO: Replace with actual authentication service
      console.log('✅ Account created:', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
      });

      // Redirect to login page
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }, 1500);
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
   * Navigate to login page
   */
  onLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Navigate to home page
   */
  onBackHome(): void {
    this.router.navigate(['/']);
  }
}

