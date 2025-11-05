// Analysis Types
export type AnalysisStatus = 'safe' | 'uncertain' | 'danger';

export interface AnalysisResult {
  id: string;
  status: AnalysisStatus;
  confidence: number;
  message: string;
  detectedFeatures?: string[];
  recommendations?: string[];
  timestamp: string;
}

export interface ImageUpload {
  id: string;
  file: File;
  preview: string;
  uploadedAt: string;
}

export interface AdditionalInfo {
  location: string;
  size: {
    width: number;
    height: number;
    depth: number;
    unit: 'cm' | 'mm';
  };
  additionalImages: ImageUpload[];
  notes?: string;
}

export interface InspectionCenter {
  id: string;
  name: string;
  address: string;
  distance: number;
  estimatedCost: {
    min: number;
    max: number;
  };
  inspectionTime: string;
  rating: number;
  phone: string;
  certified: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface AnalysisApiResponse {
  result: AnalysisResult;
}

export interface InspectionCentersApiResponse {
  centers: InspectionCenter[];
}

// Store Types
export interface AnalysisStore {
  currentStep: number;
  uploadedImages: ImageUpload[];
  analysisResult: AnalysisResult | null;
  additionalInfo: AdditionalInfo | null;
  inspectionCenters: InspectionCenter[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setStep: (step: number) => void;
  addImage: (image: ImageUpload) => void;
  removeImage: (id: string) => void;
  setAnalysisResult: (result: AnalysisResult) => void;
  setAdditionalInfo: (info: AdditionalInfo) => void;
  setInspectionCenters: (centers: InspectionCenter[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

// Component Props Types
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'email' | 'tel' | 'textarea';
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}
