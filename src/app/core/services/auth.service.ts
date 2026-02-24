import { Injectable, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  OAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  user$ = user(this.auth); // Observable for login state

  // Google Login
  async googleLogin() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  // Apple Login
  async appleLogin() {
    const provider = new OAuthProvider('apple.com');
    return await signInWithPopup(this.auth, provider);
  }

  // Email/Password Sign Up
  async signUp(email: string, pass: string) {
    return await createUserWithEmailAndPassword(this.auth, email, pass);
  }

  // Email/Password Login
  async login(email: string, pass: string) {
    return await signInWithEmailAndPassword(this.auth, email, pass);
  }

  // Phone Number Login
  async signInWithPhoneNumber(phoneNumber: string, appVerifier: RecaptchaVerifier) {
    return await signInWithPhoneNumber(this.auth, phoneNumber, appVerifier);
  }

  logout() {
    return signOut(this.auth);
  }
}