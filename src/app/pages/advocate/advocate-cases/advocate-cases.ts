import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CaseService } from '../../../core/services/case.service';
import { Case } from '../../../models/cases/case';

@Component({
  selector: 'app-advocate-cases',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './advocate-cases.html',
  styleUrls: ['./advocate-cases.css']
})
export class AdvocateCases implements OnInit {
  private caseService = inject(CaseService);

  allCases = signal<Case[]>([]);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);
  
  displayedColumns: string[] = ['caseNumber', 'clientName', 'cnrNumber', 'status', 'actions'];

  ngOnInit() {
    this.loadCases();
  }

  loadCases() {
    this.isLoading.set(true);
    this.caseService.getAllCases().subscribe({
      next: (data: Case[]) => {
        this.allCases.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching cases:', err);
        this.errorMessage.set('Failed to load cases from the server.');
        this.isLoading.set(false);
      }
    });
  }
}