import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate-invoice-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './generate-invoice-modal.html',
  styleUrls: ['./generate-invoice-modal.css']
})
export class GenerateInvoiceModalComponent {
  private dialogRef = inject(MatDialogRef<GenerateInvoiceModalComponent>);
  private fb = inject(FormBuilder);

  invoiceForm = this.fb.group({
    clientName: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    amount: [null, [Validators.required, Validators.min(1)]],
    status: ['Unpaid', Validators.required]
  });

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.invoiceForm.valid) {
      this.dialogRef.close(this.invoiceForm.value);
    }
  }
}