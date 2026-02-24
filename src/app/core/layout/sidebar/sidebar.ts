import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule, MatButtonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  // Signal to manage collapse state
  isCollapsed = signal(false);

  menuItems = signal([
    { label: 'Dashboard', icon: 'dashboard', route: '/advocate/dashboard' },
    { label: 'My Cases', icon: 'gavel', route: '/cases' },
    { label: 'Court Diary', icon: 'event_note', route: '/diary' },
    { label: 'Documents', icon: 'folder', route: '/docs' },
    { label: 'Clients', icon: 'people', route: '/clients' },
    { label: 'Billing', icon: 'account_balance_wallet', route: '/billing' }
  ]);

  toggleSidebar() {
    this.isCollapsed.set(!this.isCollapsed());
  }
}