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
    console.log("응답 데이터 타입:", typeof response.data);
    console.log("응답 데이터 키들:", Object.keys(response.data));

    // 백엔드 응답 구조에 따라 유연하게 처리
    // Case 1: {data: {result: ...}} 구조
    if (response.data.data) {
      console.log("response.data.data 존재:", response.data.data);
      return response.data.data;
    }
    // Case 2: {result: ...} 구조 (백엔드가 직접 result를 반환)
    else if (response.data) {
      console.log("response.data 직접 반환:", response.data);
      return response.data as any;
    }

    throw new Error("예상하지 못한 응답 구조입니다.");
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
 * Submit additional information for more detailed analysis (2단계 분석)
 */
export const submitAdditionalInfo = async (
  analysisId: string,
  additionalInfo: AdditionalInfo
): Promise<AnalysisApiResponse> => {
  console.log("=== 2단계 분석 요청 ===");
  console.log("분석 ID:", analysisId);
  console.log("추가 정보:", additionalInfo);

  const formData = new FormData();

  // Append additional images (image1, image2, ...)
  additionalInfo.additionalImages.forEach((image, index) => {
    formData.append(`image${index + 1}`, image.file);
  });

  // Append location data as JSON string (숫자를 JSON string으로)
  if (additionalInfo.location) {
    // location에서 위도/경도 추출 (예: "서울특별시 강남구" 같은 텍스트가 올 수 있음)
    // 현재는 임시로 기본 위치 사용, 추후 geocoding API 연동 필요
    formData.append('latitude', JSON.stringify(35.15632021200898));
    formData.append('longitude', JSON.stringify(128.09313284826987));
  }

  console.log("FormData 생성 완료");
  console.log("요청 URL:", `/api/analysis/${analysisId}`);

  try {
    const response = await client.post<ApiResponse<AnalysisApiResponse>>(
      `/api/analysis/${analysisId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log("2단계 분석 응답 성공:", response);
    console.log("응답 데이터:", response.data);

    // 백엔드 응답 구조에 따라 유연하게 처리
    if (response.data.data) {
      console.log("response.data.data 존재:", response.data.data);
      return response.data.data;
    } else if (response.data) {
      console.log("response.data 직접 반환:", response.data);
      return response.data as any;
    }

    throw new Error("예상하지 못한 응답 구조입니다.");
  } catch (error: any) {
    console.error("=== 2단계 분석 API 에러 ===");
    console.error("에러:", error);
    console.error("에러 응답:", error.response);
    console.error("에러 응답 데이터:", error.response?.data);
    console.error("에러 상태 코드:", error.response?.status);
    console.error("에러 메시지:", error.response?.data?.message || error.message);

    // FormData 내용 확인 (디버깅용)
    console.error("전송한 FormData 확인:");
    console.error("- 분석 ID:", analysisId);
    console.error("- 추가 이미지 개수:", additionalInfo.additionalImages.length);
    console.error("- 위치 정보:", additionalInfo.location);

    throw error;
  }
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

  try {
    const response = await client.get<ApiResponse<InspectionCentersApiResponse>>(
      '/api/inspection-centers',
      { params }
    );

    console.log("검사소 조회 응답:", response.data);

    // 응답 구조에 따라 유연하게 처리
    if (response.data.data) {
      return response.data.data;
    } else if (response.data) {
      return response.data as any;
    }

    // 데이터가 없으면 빈 배열 반환
    return { centers: [] };
  } catch (error: any) {
    console.warn("검사소 조회 실패:", error);
    // 404 등의 에러 시 빈 배열 반환 (에러를 throw하지 않음)
    if (error.response?.status === 404) {
      console.warn("검사소 API가 아직 구현되지 않았습니다 (404)");
    }
    return { centers: [] };
  }
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
  console.log("=== getAnalysisById 함수 호출 ===");
  console.log("분석 ID:", analysisId);
  console.log("요청 URL:", `/api/analysis/${analysisId}`);

  try {
    const response = await client.get(`/api/analysis/${analysisId}`);

    console.log("분석 결과 조회 성공:", response);
    console.log("응답 데이터:", response.data);
    console.log("응답 데이터 타입:", typeof response.data);
    console.log("응답 데이터 키들:", Object.keys(response.data));

    // 백엔드 응답 구조에 따라 유연하게 처리
    if (response.data.data) {
      console.log("response.data.data 존재:", response.data.data);
      return response.data.data;
    } else if (response.data) {
      console.log("response.data 직접 반환:", response.data);
      return response.data as any;
    }

    throw new Error("예상하지 못한 응답 구조입니다.");
  } catch (error: any) {
    console.error("=== getAnalysisById API 에러 ===");
    console.error("에러:", error);
    console.error("에러 응답:", error.response);
    throw error;
  }
};

/**
 * Delete analysis record
 */
export const deleteAnalysis = async (analysisId: string) => {
  const response = await client.delete(`/api/analysis/${analysisId}`);
  return response.data;
};
