// src/app/core/services/file-upload.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/upload`;

  uploadCaseDocument(caseId: string, file: File, category: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('caseId', caseId);
    formData.append('category', category); // e.g., 'Order', 'Evidence', 'Vakalatnama'

    return this.http.post(this.API_URL, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / (event.total || 1));
            return { status: 'progress', message: progress };
          case HttpEventType.Response:
            return { status: 'success', message: event.body };
          default:
            return { status: 'pending', message: 0 };
        }
      })
    );
  }
}