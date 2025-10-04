import { create } from 'zustand';
import { AnalysisState, ImageUpload, AnalysisResult, AdditionalInfo, InspectionCenter } from '@types/index';

interface AnalysisActions {
  setCurrentStep: (step: number) => void;
  addImage: (image: ImageUpload) => void;
  removeImage: (id: string) => void;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  setAdditionalInfo: (info: Partial<AdditionalInfo>) => void;
  setInspectionCenters: (centers: InspectionCenter[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetAnalysis: () => void;
}

const initialState: AnalysisState = {
  currentStep: 1,
  images: [],
  analysisResult: null,
  additionalInfo: {},
  inspectionCenters: [],
  isLoading: false,
  error: null,
};

export const useAnalysisStore = create<AnalysisState & AnalysisActions>((set) => ({
  ...initialState,

  setCurrentStep: (step) => set({ currentStep: step }),

  addImage: (image) => set((state) => ({
    images: [...state.images, image]
  })),

  removeImage: (id) => set((state) => ({
    images: state.images.filter((img) => img.id !== id)
  })),

  setAnalysisResult: (result) => set({ analysisResult: result }),

  setAdditionalInfo: (info) => set((state) => ({
    additionalInfo: { ...state.additionalInfo, ...info }
  })),

  setInspectionCenters: (centers) => set({ inspectionCenters: centers }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  resetAnalysis: () => set(initialState),
}));
