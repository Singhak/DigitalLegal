import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface Invoice {
  id: string;
  invoiceNumber: string;
  description: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
}

@Component({
  selector: 'app-client-invoices',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './client-invoices.html',
  styleUrls: ['./client-invoices.css']
})
export class ClientInvoices {
  invoices = signal<Invoice[]>([
    { id: '1', invoiceNumber: 'INV-2026-001', description: 'Initial Legal Consultation', date: '2026-03-10', amount: 15000, status: 'Paid' },
    { id: '2', invoiceNumber: 'INV-2026-003', description: 'Court Filing Fees', date: '2026-03-14', amount: 5000, status: 'Unpaid' }
  ]);

  displayedColumns: string[] = ['invoiceNumber', 'description', 'date', 'amount', 'status', 'actions'];
  selectedInvoice = signal<Invoice | null>(null);

  printInvoice(invoice: Invoice) {
    this.selectedInvoice.set(invoice);
    // Give Angular a moment to render the hidden print template before calling print
    setTimeout(() => {
      window.print();
      this.selectedInvoice.set(null);
    }, 100);
  }
}