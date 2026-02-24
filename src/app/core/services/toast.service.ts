import { Injectable, inject, signal } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  timestamp: Date;
  read: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private snackBar = inject(MatSnackBar);

  // Stream to store notification history
  private notifications = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notifications.asObservable();

  private readonly config: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };

  private addNotification(message: string, type: 'success' | 'error' | 'info') {
    const current = this.notifications.value;
    const newItem: Notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date(),
      read: false
    };
    this.notifications.next([newItem, ...current]);
  }

  success(message: string) {
    this.addNotification(message, 'success');
    this.snackBar.open(message, 'DISMISS', { ...this.config, panelClass: ['legal-toast-success'] });
  }

  error(message: string) {
    this.addNotification(message, 'error');
    this.snackBar.open(message, 'CLOSE', { ...this.config, panelClass: ['legal-toast-error'] });
  }

  markAllAsRead() {
    const read = this.notifications.value.map(n => ({ ...n, read: true }));
    this.notifications.next(read);
  }

  /**
 * Empties the notification history list.
 */
  clearAll(): void {
    this.notifications.next([]);
  }

  /**
   * Marks a single notification as read by its unique ID.
   */
  markAsRead(id: number): void {
    const current = this.notifications.value.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    this.notifications.next(current);
  }
}