import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GenerateInvoiceModalComponent } from './generate-invoice-modal/generate-invoice-modal';

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
}

@Component({
  selector: 'app-advocate-billing',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './advocate-billing.html',
  styleUrls: ['./advocate-billing.css']
})
export class AdvocateBilling {
  private dialog = inject(MatDialog);

  invoices = signal<Invoice[]>([
    { id: '1', invoiceNumber: 'INV-2026-001', clientName: 'Valued Client', date: '2026-03-10', amount: 15000, status: 'Paid' },
    { id: '2', invoiceNumber: 'INV-2026-002', clientName: 'Anil Sharma', date: '2026-03-12', amount: 25000, status: 'Unpaid' }
  ]);

  displayedColumns: string[] = ['invoiceNumber', 'clientName', 'date', 'amount', 'status', 'actions'];
  selectedInvoice = signal<Invoice | null>(null);

  printInvoice(invoice: Invoice) {
    this.selectedInvoice.set(invoice);
    // Give Angular a moment to render the hidden print template before calling print
    setTimeout(() => {
      window.print();
      // Clear it after print dialog closes
      this.selectedInvoice.set(null);
    }, 100);
  }

  openGenerateInvoiceModal() {
    const dialogRef = this.dialog.open(GenerateInvoiceModalComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Generate dummy ID and Invoice Number, and append form data
        const newInvoice: Invoice = {
          id: Math.random().toString(36).substr(2, 9),
          invoiceNumber: `INV-2026-${String(this.invoices().length + 1).padStart(3, '0')}`,
          clientName: result.clientName,
          date: result.date,
          amount: result.amount,
          status: result.status
        };
        
        this.invoices.update(invs => [...invs, newInvoice]);
      }
    });
  }
}