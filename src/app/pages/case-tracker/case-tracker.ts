import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface Stage {
  label: string;
  key: string;
  status: 'past' | 'current' | 'future';
  date?: string;
}

@Component({
  selector: 'app-case-tracker',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './case-tracker.html',
  styleUrls: ['./case-tracker.css']
})
export class CaseTracker {
  stages: Stage[] = [
    { label: 'Notice', key: 'notice', status: 'past', date: '2026-01-10' },
    { label: 'Reply', key: 'reply', status: 'past', date: '2026-02-05' },
    { label: 'Evidence', key: 'evidence', status: 'current', date: 'In Progress' },
    { label: 'Arguments', key: 'arguments', status: 'future' },
    { label: 'Judgment', key: 'judgment', status: 'future' }
  ];
}