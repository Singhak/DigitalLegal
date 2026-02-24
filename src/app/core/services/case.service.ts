// src/app/core/services/case.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Case } from '../../models/cases/case';

@Injectable({ providedIn: 'root' })
export class CaseService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/cases`;

  // Search cases in your MongoDB backend
  searchCases(query: string): Observable<Case[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<Case[]>(`${this.API_URL}/search`, { params });
  }

  // Fetch all cases for the Advocate Dashboard
  getAllCases(): Observable<Case[]> {
    return this.http.get<Case[]>(this.API_URL);
  }

  // Add a new case to the MongoDB database
  createNewCase(caseData: Partial<Case>): Observable<Case> {
    return this.http.post<Case>(this.API_URL, caseData);
  }

  // Update a specific case (e.g., changing the stage)
  updateCase(id: string, updates: Partial<Case>): Observable<Case> {
    return this.http.patch<Case>(`${this.API_URL}/${id}`, updates);
  }
}