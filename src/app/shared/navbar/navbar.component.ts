import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.interface';

@Component({
  selector: 'app-navbar',
  template: `
    <nav>
      <span>Welcome, {{ user?.firstName }} {{ user?.lastName }}</span>
      <span>Points: {{ user?.points }}</span>
    </nav>
  `
})
export class NavbarComponent implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userId = 'user123'; // Replace with actual logic to get user ID
    this.userService.getCurrentUser(userId).subscribe(user => {
      this.user = user;
    });
  }
} 