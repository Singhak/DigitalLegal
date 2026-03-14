import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule, MatButtonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent implements OnInit {
  private router = inject(Router);

  // Signal to manage collapse state
  isCollapsed = signal(false);

  advocateMenu = [
    { label: 'Dashboard', icon: 'dashboard', route: '/advocate/dashboard' },
    { label: 'My Cases', icon: 'gavel', route: '/advocate/cases' },
    { label: 'Court Diary', icon: 'event_note', route: '/diary' },
    { label: 'Documents', icon: 'folder', route: '/docs' },
    { label: 'Clients', icon: 'people', route: '/clients' },
    { label: 'Billing', icon: 'account_balance_wallet', route: '/advocate/billing' }
  ];

  clientMenu = [
    { label: 'My Dashboard', icon: 'dashboard', route: '/client/dashboard' },
    { label: 'My Cases', icon: 'gavel', route: '/client/cases' },
    { label: 'Shared Docs', icon: 'folder', route: '/client/docs' },
    { label: 'Invoices', icon: 'receipt', route: '/client/invoices' }
  ];

  menuItems = signal(this.advocateMenu);

  ngOnInit() {
    this.updateMenu(this.router.url);

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.updateMenu(event.urlAfterRedirects);
    });
  }

  private updateMenu(url: string) {
    if (url.includes('/client')) {
      this.menuItems.set(this.clientMenu);
    } else {
      this.menuItems.set(this.advocateMenu);
    }
  }

  toggleSidebar() {
    this.isCollapsed.set(!this.isCollapsed());
  }
}