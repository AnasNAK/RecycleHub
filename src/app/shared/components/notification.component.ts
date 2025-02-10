import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (notification$ | async; as notification) {
      <div class="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300"
           [ngClass]="{
             'bg-green-100 text-green-800': notification.type === 'success',
             'bg-red-100 text-red-800': notification.type === 'error',
             'bg-blue-100 text-blue-800': notification.type === 'info'
           }">
        {{ notification.message }}
      </div>
    }
  `
})
export class NotificationComponent {
  notification$ = this.notificationService.notification$;

  constructor(private notificationService: NotificationService) {}
} 