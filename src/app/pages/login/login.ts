import { Component, inject, OnInit, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RecaptchaVerifier, ConfirmationResult } from '@angular/fire/auth';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    CommonModule,
    MatIconModule
  ],
})
export default class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  loginMode: 'email' | 'otp' = 'email'; // Toggle between flows
  isOtpSent = false;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  otpForm:FormGroup = this.fb.group({
    phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
    code: ['', Validators.required]
  });

  recaptchaVerifier: RecaptchaVerifier | null = null;
  confirmationResult: ConfirmationResult | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize reCAPTCHA verifier
      setTimeout(() => {
        if (this.authService['auth']) {
          this.recaptchaVerifier = new RecaptchaVerifier(this.authService['auth'], 'recaptcha-container', {
            size: 'invisible',
          });
        }
      }, 0);
    }
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        await this.authService.login(email, password);
        this.router.navigate(['/']);
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }

  async onGoogleLogin() {
    try {
      await this.authService.googleLogin();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Google login failed:', error);
    }
  }

  async sendOtpCode() {
    if (this.otpForm.get('phoneNumber')?.valid && this.recaptchaVerifier) {
      const phoneNumber = this.otpForm.get('phoneNumber')?.value;
      try {
        this.confirmationResult = await this.authService.signInWithPhoneNumber(
          phoneNumber,
          this.recaptchaVerifier
        );
        this.isOtpSent = true;
      } catch (error) {
        console.error('SMS not sent', error);
      }
    }
  }

  async verifyOtpCode() {
    if (this.otpForm.get('verificationCode')?.valid && this.confirmationResult) {
      const verificationCode = this.otpForm.get('verificationCode')?.value;
      try {
        await this.confirmationResult.confirm(verificationCode);
        this.router.navigate(['/']);
      } catch (error) {
        console.error('Code verification failed', error);
      }
    }
  }
}