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
  selector: 'app-client-cases',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './client-cases.html',
  styleUrls: ['./client-cases.css']
})
export class ClientCases implements OnInit {
  private caseService = inject(CaseService);
  private router = inject(Router);

  clientCases = signal<Case[]>([]);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);
  
  displayedColumns: string[] = ['caseNumber', 'cnrNumber', 'status', 'actions'];

  ngOnInit() {
    this.loadCases();
  }

  loadCases() {
    this.isLoading.set(true);
    this.caseService.getAllCases().subscribe({
      next: (data: Case[]) => {
        // In a real app, this should only fetch cases linked to the logged-in client.
        this.clientCases.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching client cases:', err);
        this.errorMessage.set('Failed to load your cases.');
        this.isLoading.set(false);
      }
    });
  }

  viewCaseDetails(caseId: string) {
    // Redirect to case detail component (e.g. /client/cases/123)
    this.router.navigate(['/client/cases', caseId]);
  }
}