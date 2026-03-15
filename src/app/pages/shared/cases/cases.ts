import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { CaseService } from '../../../core/services/case.service';
import { Case } from '../../../models/cases/case';
import { AddCaseModalComponent } from '../../add-case-modal/add-case-modal';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-shared-cases',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './cases.html',
  styleUrls: ['./cases.css']
})
export class SharedCasesComponent implements OnInit {
  private caseService = inject(CaseService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  cases = signal<Case[]>([]);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);

  isClient = signal(false);
  displayedColumns = signal<string[]>([]);

  ngOnInit() {
    // Determine mode based on URL
    this.isClient.set(this.router.url.includes('/client'));

    if (this.isClient()) {
      this.displayedColumns.set(['caseNumber', 'cnrNumber', 'status', 'actions']);
    } else {
      this.displayedColumns.set(['caseNumber', 'clientName', 'cnrNumber', 'status', 'actions']);
    }

    this.loadCases();
  }

  loadCases() {
    this.isLoading.set(true);
    this.caseService.getAllCases().subscribe({
      next: (data: Case[]) => {
        this.cases.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching cases:', err);
        this.errorMessage.set('Failed to load cases.');
        this.isLoading.set(false);
      }
    });
  }

  viewCaseDetails(caseId: string) {
    if (this.isClient()) {
      this.router.navigate(['/client/cases', caseId]);
    } else {
      // Add advocate routing if needed later
    }
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
        this.loadCases();
      }
    });
  }
}