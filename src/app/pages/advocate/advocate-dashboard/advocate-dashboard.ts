import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AddCaseModalComponent } from '../../add-case-modal/add-case-modal';
import { MatDialog } from '@angular/material/dialog';
import { CaseService } from '../../../core/services/case.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu'
import { FormsModule } from '@angular/forms';
import { Case } from '../../../models/cases/case';
import { MatButtonModule } from '@angular/material/button';
import { LegalButtonDirective } from '../../../shared/directive/legal-button.directive';

export interface CourtHearing {
  caseNo: string;
  parties: string;
  court: string; // e.g., 'HC - Room 14' or 'Saket - Court 5'
  stage: string;
  time: string;
}

@Component({
  selector: 'app-advocate-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule, MatProgressSpinnerModule, MatMenuModule, FormsModule, MatIconModule, MatButtonModule, LegalButtonDirective],
  templateUrl: './advocate-dashboard.html',
  styleUrls: ['./advocate-dashboard.css']
})
export class AdvocateDashboard {
  // Mock data representing your digital diary
  hearings = signal<CourtHearing[]>([
    { caseNo: 'W.P.(C) 4502/2026', parties: 'Anil vs. DDA', court: 'Delhi HC - R.12', stage: 'Arguments', time: '10:30 AM' },
    { caseNo: 'CS(OS) 112/2025', parties: 'M/S Tech vs. Union', court: 'Patiala House - C.4', stage: 'Evidence', time: '11:45 AM' },
    { caseNo: 'Crl.Rev.P. 88/2026', parties: 'State vs. Sharma', court: 'Delhi HC - R.22', stage: 'Notice', time: '02:15 PM' }
  ]);

  totalCases = signal(42);
  pendingFilings = signal(5);
  unpaidInvoices = signal(12);
  today = signal(new Date());
  searchTerm = signal(''); // Tracks what you type in the search bar
  private dialog = inject(MatDialog);
  private caseService = inject(CaseService);

  // Signals for state management
  allCases = signal<Case[]>([]);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  // Quick summary for the header
  todayCount = computed(() => this.hearings().length);

  // Computed Signal: Automatically updates whenever allCases or searchTerm changes
  filteredCases = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.allCases();

    return this.allCases().filter(c =>
      c.caseNumber.toLowerCase().includes(term) ||
      c.clientName.toLowerCase().includes(term) ||
      c.cnrNumber.toLowerCase().includes(term)
    );
  });

  /**
   * Fetches fresh data from your MongoDB backend.
   * This is called on init and after adding/updating a case.
   */
  loadDashboardData() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.caseService.getAllCases().subscribe({
      next: (data: Case[]) => {
        this.allCases.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load cases from MongoDB:', err);
        this.errorMessage.set('Unable to sync with Digital Legal servers.');
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Opens the registration modal and refreshes data upon close.
   */
  openAddCaseModal() {
    const dialogRef = this.dialog.open(AddCaseModalComponent, {
      width: '85vw',           // Wide: 85% of viewport width
      maxWidth: '1200px',      // Maximum width to prevent over-stretching on large monitors
      height: '90vh',
      panelClass: 'legal-modal-container',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      // If result exists, the case was saved successfully in MongoDB
      if (result) {
        this.loadDashboardData();
      }
    });
  }

  onCaseAdded() {
    this.loadDashboardData();
  }
}