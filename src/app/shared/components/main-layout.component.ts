import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-nav-bar></app-nav-bar>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class MainLayoutComponent {} 