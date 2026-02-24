import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CaseService } from '../../core/services/case.service';
import { FileUploadService } from '../../core/services/file-upload.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-case-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './add-case-modal.html',
  styleUrls: ['./add-case-modal.css']
})
export class AddCaseModalComponent {
  private fb = inject(FormBuilder);
  private fileService = inject(FileUploadService);
  private caseService = inject(CaseService);
  private dialogRef = inject(MatDialogRef<AddCaseModalComponent>);

  caseForm: FormGroup = this.fb.group({
    caseNumber: ['', Validators.required],
    clientName: ['', Validators.required],
    cnrNumber: ['', [Validators.required, Validators.minLength(16)]],
    forum: ['Delhi High Court', Validators.required], // Default to your primary court
    nextHearingDate: ['', Validators.required]
  });

  // Store files selected by the advocate before they are sent to MongoDB
  selectedFiles: File[] = [];
  uploadProgress = signal<number>(0);
  isUploading = signal(false);

  // Method 1: Handle File Selection via Input
  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      this.selectedFiles.push(...Array.from(files as FileList));
    }
  }

  // Method 2: Handle Drag and Drop
  onFileDropped(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      this.selectedFiles.push(...Array.from(files));
    }
  }

  // Method 3: Remove file from list before saving
  removeFile(file: File) {
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
  }

  // Method 4: The Final Submission Logic
  async onSubmit() {
    if (this.caseForm.valid) {
      this.isUploading.set(true);

      // 1. Create the case in MongoDB first to get a Case ID
      this.caseService.createNewCase(this.caseForm.value).subscribe({
        next: (newCase) => {
          if (this.selectedFiles.length > 0) {
            this.uploadAllFiles(newCase._id!);
          } else {
            this.dialogRef.close(newCase);
          }
        },
        error: (err) => {
          this.isUploading.set(false);
          console.error('Case registration failed:', err);
        }
      });
    }
  }

  // Method 5: Sequential Upload Logic
  private uploadAllFiles(caseId: string) {
    // For a simple implementation, we'll upload them one by one
    // In a production app for Panwar Law, you might use forkJoin for parallel uploads
    this.selectedFiles.forEach((file, index) => {
      this.fileService.uploadCaseDocument(caseId, file, 'General').subscribe({
        next: (event) => {
          if (event.status === 'progress') {
            this.uploadProgress.set(Number(event.message));
          }
          if (index === this.selectedFiles.length - 1 && event.status === 'success') {
            this.dialogRef.close(true);
          }
        }
      });
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

}