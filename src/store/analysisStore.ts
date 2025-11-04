import { create } from 'zustand';
import { AnalysisStore } from '@/types';

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  currentStep: 1,
  uploadedImages: [],
  analysisResult: null,
  additionalInfo: null,
  inspectionCenters: [],
  isLoading: false,
  error: null,

  setStep: (step) => set({ currentStep: step }),

  addImage: (image) =>
    set((state) => ({
      uploadedImages: [...state.uploadedImages, image],
    })),

  removeImage: (id) =>
    set((state) => ({
      uploadedImages: state.uploadedImages.filter((img) => img.id !== id),
    })),

  setAnalysisResult: (result) => set({ analysisResult: result }),

  setAdditionalInfo: (info) => set({ additionalInfo: info }),

  setInspectionCenters: (centers) => set({ inspectionCenters: centers }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  reset: () =>
    set({
      currentStep: 1,
      uploadedImages: [],
      analysisResult: null,
      additionalInfo: null,
      inspectionCenters: [],
      isLoading: false,
      error: null,
    }),
}));
