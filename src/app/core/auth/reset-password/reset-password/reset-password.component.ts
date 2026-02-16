import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  // Signals for state management
  email = signal('');
  isSubmitting = signal(false);
  isEmailSent = signal(false);
  errorMessage = signal('');

  async onSubmit(): Promise<void> {
    // Reset error
    this.errorMessage.set('');

    // Validate email
    if (!this.email() || !this.isValidEmail(this.email())) {
      this.errorMessage.set('Please enter a valid email address');
      return;
    }

    // Simulate API call
    this.isSubmitting.set(true);

    try {
      // TODO: Replace with your actual API call
      await this.simulateApiCall();
      this.isEmailSent.set(true);
    } catch (error) {
      this.errorMessage.set('Something went wrong. Please try again.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private simulateApiCall(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 2000);
    });
  }

  resetForm(): void {
    this.email.set('');
    this.isEmailSent.set(false);
    this.errorMessage.set('');
  }
}