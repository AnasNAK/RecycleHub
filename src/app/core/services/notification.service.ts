import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  notification$ = this.notificationSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.notificationSubject.next({ message, type });
    setTimeout(() => this.notificationSubject.next(null), 3000);
  }

  clear(): void {
    this.notificationSubject.next(null);
  }
} 