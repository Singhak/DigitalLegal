import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CaseTracker } from '../../case-tracker/case-tracker';

export interface ClientCase {
  id: string;
  caseNumber: string;
  oppositeParty: string;
  nextHearing: string;
  forum: string;
  status: string;
}

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, CaseTracker],
  templateUrl: './client-dashboard.html',
  styleUrls: ['./client-dashboard.css']
})
export class ClientDashboard {
  // Using Signals for reactivity
  clientName = signal('Valued Client');
  
  activeCases = signal<ClientCase[]>([
    {
      id: '1',
      caseNumber: 'W.P.(C) 102/2026',
      oppositeParty: 'Union of India',
      nextHearing: '2026-03-15',
      forum: 'Delhi High Court',
      status: 'Evidence'
    }
  ]);
}