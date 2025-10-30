// types/document.ts

export type DocumentType = 'report' | 'manual' | 'policy' | 'form';

export interface Document {
  id: number;
  title: string;
  description: string;
  type: DocumentType;
  date: string; // ISO Date string, e.g., "2024-10-15"
  department: string;
}

export interface SearchFilters {
  searchTerm: string;
  filterType: DocumentType | '';
  filterDate: string; // YYYY-MM-DD
  filterDept: string;
}