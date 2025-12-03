import client from './client';
import {
  ApiResponse,
  AnalysisApiResponse,
  InspectionCentersApiResponse,
  AdditionalInfo,
} from '@/types';

/**
 * Upload image for asbestos analysis
 */
export const analyzeImage = async (imageFile: File): Promise<AnalysisApiResponse> => {
  console.log("=== analyzeImage 함수 호출 ===");
  console.log("파일:", imageFile);

  const formData = new FormData();
  formData.append('image', imageFile);

  console.log("FormData 생성 완료");
  console.log("요청 URL:", '/api/analysis/upload');

  try {
    const response = await client.post<ApiResponse<AnalysisApiResponse>>(
      '/api/analysis/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log("API 응답 성공:", response);
    console.log("응답 데이터:", response.data);

    return response.data.data;
  } catch (error: any) {
    console.error("=== analyzeImage API 에러 ===");
    console.error("에러:", error);
    console.error("에러 응답:", error.response);
    console.error("에러 요청:", error.request);
    console.error("에러 설정:", error.config);
    throw error;
  }
};

/**
 * Submit additional information for more detailed analysis
 */
export const submitAdditionalInfo = async (
  analysisId: string,
  additionalInfo: AdditionalInfo
): Promise<AnalysisApiResponse> => {
  const formData = new FormData();

  // Append text data
  formData.append('analysisId', analysisId);
  formData.append('location', additionalInfo.location);
  formData.append('size', JSON.stringify(additionalInfo.size));
  if (additionalInfo.notes) {
    formData.append('notes', additionalInfo.notes);
  }

  // Append additional images
  additionalInfo.additionalImages.forEach((image) => {
    formData.append(`additionalImages`, image.file);
  });

  const response = await client.post<ApiResponse<AnalysisApiResponse>>(
    '/api/analysis/additional-info',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data.data;
};

/**
 * Get nearby inspection centers based on location
 */
export const getInspectionCenters = async (
  latitude?: number,
  longitude?: number
): Promise<InspectionCentersApiResponse> => {
  const params: Record<string, any> = {};

  if (latitude !== undefined && longitude !== undefined) {
    params.lat = latitude;
    params.lng = longitude;
  }

  const response = await client.get<ApiResponse<InspectionCentersApiResponse>>(
    '/api/inspection-centers',
    { params }
  );

  return response.data.data;
};

/**
 * Get analysis history for current user
 */
export const getAnalysisHistory = async () => {
  const response = await client.get('/api/analysis/history');
  return response.data.data;
};

/**
 * Get specific analysis result by ID
 */
export const getAnalysisById = async (analysisId: string) => {
  const response = await client.get(`/api/analysis/${analysisId}`);
  return response.data.data;
};

/**
 * Delete analysis record
 */
export const deleteAnalysis = async (analysisId: string) => {
  const response = await client.delete(`/api/analysis/${analysisId}`);
  return response.data;
};
