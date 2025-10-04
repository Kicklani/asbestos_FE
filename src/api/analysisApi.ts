import { apiClient } from './client';
import { AnalysisResponse, InspectionCentersResponse } from '@types/index';

export const analysisApi = {
  // Step 1: Basic image analysis
  analyzeImage: async (imageFile: File): Promise<AnalysisResponse> => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await apiClient.post<AnalysisResponse>('/analyze/basic', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Step 2: Detailed analysis with additional info
  analyzeDetailed: async (
    images: File[],
    location?: string,
    size?: string,
    notes?: string
  ): Promise<AnalysisResponse> => {
    const formData = new FormData();

    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    if (location) formData.append('location', location);
    if (size) formData.append('size', size);
    if (notes) formData.append('notes', notes);

    const response = await apiClient.post<AnalysisResponse>('/analyze/detailed', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Step 3: Get inspection centers
  getInspectionCenters: async (
    latitude?: number,
    longitude?: number
  ): Promise<InspectionCentersResponse> => {
    const params = latitude && longitude ? { latitude, longitude } : {};
    const response = await apiClient.get<InspectionCentersResponse>('/inspection-centers', {
      params,
    });
    return response.data;
  },
};
