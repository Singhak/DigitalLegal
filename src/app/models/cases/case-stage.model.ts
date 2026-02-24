// src/app/modules/cases/models/case-stage.model.ts
export interface CaseStage {
  id: string;
  name: 'Notice' | 'Reply' | 'Evidence' | 'Arguments' | 'Judgment';
  status: 'completed' | 'current' | 'pending';
  date?: Date;
  description: string;
  documentsCount: number;
}