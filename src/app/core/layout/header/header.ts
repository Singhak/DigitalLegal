import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { MatMenuModule } from '@angular/material/menu';
import { toSignal } from '@angular/core/rxjs-interop';

export interface ClientCase {
    id: string;
    caseNumber: string;
    oppositeParty: string;
    nextHearing: string;
    forum: string;
    status: string;
}

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, MatIconModule, FormsModule, MatButtonModule, MatMenuModule],
    templateUrl: './header.html',
    styleUrl: './header.css'
})
export class HeaderComponent {
    isSearchExpanded = signal(false);
    searchQuery = signal('');
    private router = inject(Router);

    private toastService = inject(ToastService);

    // Convert the Observable to a Signal
    notifications = toSignal(this.toastService.notifications$, { initialValue: [] });

    unreadCount = computed(() =>
        this.notifications().filter(n => !n.read).length
    );

    onOpenNotifications() {
        this.toastService.markAllAsRead();
    }

    clearHistory() {
        // Implement clear logic in service if needed
    }

    toggleSearch() {
        this.isSearchExpanded.set(!this.isSearchExpanded());
        // Auto-focus logic can be added here using ViewChild if desired
    }
    onSearchSubmit() {
        const query = this.searchQuery().trim();

        if (query) {
            console.log(`Searching for: ${query}`);

            // Navigate to the Cases module with the search query as a parameter
            this.router.navigate(['/cases'], {
                queryParams: { q: query }
            });

            // Optional: Collapse search bar after submission
            // this.isSearchExpanded.set(false);
        }
    }
}