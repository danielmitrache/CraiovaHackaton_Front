import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { LoggerService } from '../services/logger.service';
import { PasswordValidator } from '../utils/password-validator';

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
  address = '';
  city = '';
  email = '';
  password = '';
  confirmPassword = '';
  agreeToTerms = false;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  errorMessage = '';
  passwordStrength = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    private logger: LoggerService
  ) {}

  /**
   * Set account type
   */
  setAccountType(type: 'user' | 'service'): void {
    this.accountType = type;
    this.errorMessage = '';
    this.logger.debug('Account type changed', { type });
  }

  /**
   * Check password strength as user types
   */
  onPasswordChange(): void {
    this.passwordStrength = PasswordValidator.getStrength(this.password);
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
   * Get password strength label
   */
  getPasswordStrengthLabel(): string {
    return PasswordValidator.getStrengthLabel(this.passwordStrength);
  }

  /**
   * Get password strength color
   */
  getPasswordStrengthColor(): string {
    return PasswordValidator.getStrengthColor(this.passwordStrength);
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
      if (!this.serviceName || !this.serviceCUI || !this.address || !this.city || !this.email || !this.password || !this.confirmPassword) {
        this.errorMessage = 'Please fill in all fields';
        return;
      }
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    // Validate password strength
    const passwordValidation = PasswordValidator.validate(this.password);
    if (!passwordValidation.valid) {
      this.errorMessage = passwordValidation.errors[0];
      this.toastService.error(passwordValidation.errors.join('. '));
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
    this.logger.info('Registration attempt started', {
      accountType: this.accountType,
      email: this.email
    });

    // Call authentication service
    const registerData = {
      accountType: this.accountType,
      email: this.email,
      password: this.password,
      ...(this.accountType === 'user'
        ? { fullName: this.fullName }
        : {
            serviceName: this.serviceName,
            serviceCUI: this.serviceCUI,
            address: this.address,
            city: this.city
          }
      )
    };

    this.authService.register(registerData).subscribe({
      next: (response) => {
        this.isLoading = false;

        if (response.success) {
          this.logger.info('Registration successful', { email: this.email });

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
          this.errorMessage = response.message || 'Registration failed';
          this.toastService.error(this.errorMessage);
          this.logger.warn('Registration failed', { reason: response.message });
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Registration failed. Please try again.';
        this.toastService.error(this.errorMessage);
        this.logger.error('Registration error', error);
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
   * Navigate to login page
   */
  onLogin(): void {
    this.logger.debug('Navigate to login');
    this.router.navigate(['/login']);
  }

  /**
   * Show Terms and Conditions
   */
  onShowTerms(): void {
    this.logger.debug('Show terms and conditions');
    this.toastService.info('Terms and Conditions page coming soon!');
    // TODO: Implement terms and conditions modal or navigate to terms page
  }

  /**
   * Navigate back to main page
   */
  onBackToHome(): void {
    this.router.navigate(['/main-page']);
  }
}
