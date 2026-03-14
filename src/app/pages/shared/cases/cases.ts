import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { CaseService } from '../../../core/services/case.service';
import { Case } from '../../../models/cases/case';

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
}