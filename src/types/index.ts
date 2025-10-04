// Analysis result types
export type AnalysisStatus = 'green' | 'yellow' | 'red';

export interface AnalysisResult {
  status: AnalysisStatus;
  confidence: number;
  message: string;
  recommendation: string;
  timestamp: string;
}

export interface ImageUpload {
  id: string;
  file: File;
  preview: string;
  uploadedAt: string;
}

export interface AdditionalInfo {
  location?: string;
  size?: string;
  additionalImages?: ImageUpload[];
  notes?: string;
}

export interface InspectionCenter {
  id: string;
  name: string;
  location: string;
  distance: number;
  estimatedCost: {
    min: number;
    max: number;
  };
  inspectionTime: string;
  contact?: string;
  address?: string;
}

// API response types
export interface AnalysisResponse {
  success: boolean;
  data: AnalysisResult;
  error?: string;
}

export interface InspectionCentersResponse {
  success: boolean;
  data: InspectionCenter[];
  error?: string;
}

// Store types
export interface AnalysisState {
  currentStep: number;
  images: ImageUpload[];
  analysisResult: AnalysisResult | null;
  additionalInfo: AdditionalInfo;
  inspectionCenters: InspectionCenter[];
  isLoading: boolean;
  error: string | null;
}
