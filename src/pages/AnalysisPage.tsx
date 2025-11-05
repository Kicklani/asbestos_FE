import React, { useState } from "react";
import {
  ImageUploader,
  AnalysisResult as AnalysisResultComponent,
  AdditionalInfoForm,
  InspectionCenterList,
} from "@/components/analysis";
import { Card, LoadingSpinner, Button } from "@/components/common";
import {
  ImageUpload,
  AnalysisResult,
  AdditionalInfo,
  InspectionCenter,
} from "@/types";

type Step = "upload" | "result" | "additional-info" | "inspection-centers";

export const AnalysisPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [uploadedImages, setUploadedImages] = useState<ImageUpload[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [inspectionCenters, setInspectionCenters] = useState<
    InspectionCenter[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle image upload
  const handleImagesSelected = async (files: File[]) => {
    const newImages: ImageUpload[] = files.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString(),
    }));

    setUploadedImages(newImages);
  };

  // Handle analysis submission
  const handleAnalyze = async () => {
    if (uploadedImages.length === 0) {
      setError("최소 한 개 이상의 이미지를 업로드해주세요");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock result - replace with actual API response
      const mockResult: AnalysisResult = {
        id: `analysis-${Date.now()}`,
        status:
          Math.random() > 0.7
            ? "safe"
            : Math.random() > 0.5
            ? "uncertain"
            : "danger",
        confidence: Math.floor(Math.random() * 30) + 70,
        message:
          "제공된 이미지의 시각적 분석을 기반으로 AI 모델이 예비 스크리닝을 완료했습니다.",
        detectedFeatures: [
          "섬유질 질감 감지됨",
          "색상 패턴 분석 완료",
          "표면 특성 평가 완료",
        ],
        recommendations: [
          "상세 분석 보고서를 검토하세요",
          "우려되는 경우 전문 검사를 고려하세요",
          "이 스크리닝 기록을 보관하세요",
        ],
        timestamp: new Date().toISOString(),
      };

      setAnalysisResult(mockResult);
      setCurrentStep("result");
    } catch (err) {
      setError("분석에 실패했습니다. 다시 시도해주세요.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle continue from result
  const handleContinueFromResult = () => {
    if (analysisResult?.status === "uncertain") {
      setCurrentStep("additional-info");
    } else if (analysisResult?.status === "danger") {
      handleFetchInspectionCenters();
    }
  };

  // Handle additional info submission
  const handleAdditionalInfoSubmit = async (_info: AdditionalInfo) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // You can use `info` parameter when implementing the real API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock updated result
      const updatedResult: AnalysisResult = {
        ...analysisResult!,
        status: Math.random() > 0.5 ? "safe" : "danger",
        confidence: Math.floor(Math.random() * 20) + 80,
        message: "추가 정보를 바탕으로 보다 상세한 분석을 완료했습니다.",
        timestamp: new Date().toISOString(),
      };

      setAnalysisResult(updatedResult);

      if (updatedResult.status === "danger") {
        handleFetchInspectionCenters();
      } else {
        setCurrentStep("result");
      }
    } catch (err) {
      setError("추가 정보 처리에 실패했습니다. 다시 시도해주세요.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch inspection centers
  const handleFetchInspectionCenters = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock inspection centers
      const mockCenters: InspectionCenter[] = [
        {
          id: "1",
          name: "서울 석면 검사 센터",
          address: "서울특별시 강남구 강남대로 123",
          distance: 2.3,
          estimatedCost: { min: 150000, max: 300000 },
          inspectionTime: "3-5 영업일",
          rating: 5,
          phone: "02-1234-5678",
          certified: true,
          coordinates: { lat: 37.4979, lng: 127.0276 },
        },
        {
          id: "2",
          name: "한국 환경 분석 연구소",
          address: "서울특별시 강남구 테헤란로 456",
          distance: 3.7,
          estimatedCost: { min: 120000, max: 250000 },
          inspectionTime: "2-4 영업일",
          rating: 4,
          phone: "02-2345-6789",
          certified: true,
          coordinates: { lat: 37.5048, lng: 127.0495 },
        },
        {
          id: "3",
          name: "국가 석면 검사 서비스",
          address: "서울특별시 서초구 양재대로 789",
          distance: 5.2,
          estimatedCost: { min: 100000, max: 200000 },
          inspectionTime: "5-7 영업일",
          rating: 5,
          phone: "02-3456-7890",
          certified: true,
          coordinates: { lat: 37.4833, lng: 127.0322 },
        },
      ];

      setInspectionCenters(mockCenters);
      setCurrentStep("inspection-centers");
    } catch (err) {
      setError("검사소 정보를 불러오는데 실패했습니다. 다시 시도해주세요.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset analysis
  const handleReset = () => {
    // Clean up image previews
    uploadedImages.forEach((img) => URL.revokeObjectURL(img.preview));

    setCurrentStep("upload");
    setUploadedImages([]);
    setAnalysisResult(null);
    setInspectionCenters([]);
    setError(null);
  };

  // Render progress steps - simplified
  const renderProgressSteps = () => {
    const steps = [
      { id: "upload", label: "업로드", number: 1 },
      { id: "result", label: "결과", number: 2 },
      { id: "inspection-centers", label: "검사소", number: 3 },
    ];

    const getCurrentStepNumber = () => {
      switch (currentStep) {
        case "upload":
          return 1;
        case "result":
          return 2;
        case "additional-info":
          return 2;
        case "inspection-centers":
          return 3;
        default:
          return 1;
      }
    };

    const currentNumber = getCurrentStepNumber();

    return (
      <div className="flex items-center justify-center gap-4 mb-12">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-300 ${
                  step.number <= currentNumber
                    ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white scale-110"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.number}
              </div>
              <span
                className={`text-sm mt-3 font-medium ${
                  step.number <= currentNumber
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-1.5 rounded-full transition-all duration-300 ${
                  step.number < currentNumber
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                    : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 w-full flex flex-col items-center py-16">
      <div className="w-full max-w-[900px] px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
            석면 분석
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            AI 기반 예비 스크리닝을 위해 이미지를 업로드하세요
          </p>
        </div>

        {/* Progress Steps */}
        {renderProgressSteps()}

        {/* Important Notice */}
        <div className="mb-10 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-2xl shadow-md">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-yellow-200 rounded-xl flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                중요 안내사항
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                본 서비스는 예비 스크리닝 도구입니다. 결과는 전문 실험실 분석을
                대체할 수 없습니다. 최종 확인을 위한 인증된 전문가의 상담하시기
                바랍니다.
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-2xl shadow-md">
            <p className="text-red-600 font-semibold text-center">{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="mb-8 bg-white rounded-3xl shadow-xl p-12">
            <LoadingSpinner size="lg" message="이미지를 분석하고 있습니다..." />
          </div>
        )}

        {/* Step Content */}
        {!isLoading && (
          <>
            {/* Upload Step */}
            {uploadedImages.length > 0 && (
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    업로드된 이미지
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    {uploadedImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.preview}
                          alt="업로드됨"
                          className="w-full h-80 object-contain bg-gray-100 rounded-2xl"
                        />
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => setUploadedImages([])}
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
                        >
                          삭제
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Button
                      onClick={handleAnalyze}
                      variant="primary"
                      size="lg"
                      className="w-full py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
                    >
                      이미지 분석하기 →
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Result Step */}
            {currentStep === "result" && analysisResult && (
              <AnalysisResultComponent
                result={analysisResult}
                onContinue={handleContinueFromResult}
                onReset={handleReset}
              />
            )}

            {/* Additional Info Step */}
            {currentStep === "additional-info" && (
              <AdditionalInfoForm
                onSubmit={handleAdditionalInfoSubmit}
                onBack={() => setCurrentStep("result")}
              />
            )}

            {/* Inspection Centers Step */}
            {currentStep === "inspection-centers" && (
              <div>
                <InspectionCenterList centers={inspectionCenters} />
                <div className="mt-8 text-center">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    size="lg"
                    className="px-8 py-3"
                  >
                    새로운 분석 시작하기
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
