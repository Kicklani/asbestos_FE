import React, { useState } from 'react';
import {
  ImageUploader,
  AnalysisResult as AnalysisResultComponent,
  AdditionalInfoForm,
  InspectionCenterList,
} from '@/components/analysis';
import { Card, LoadingSpinner, Button } from '@/components/common';
import { ImageUpload, AnalysisResult, AdditionalInfo, InspectionCenter } from '@/types';

type Step = 'upload' | 'result' | 'additional-info' | 'inspection-centers';

export const AnalysisPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [uploadedImages, setUploadedImages] = useState<ImageUpload[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [inspectionCenters, setInspectionCenters] = useState<InspectionCenter[]>([]);
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
      setError('최소 한 개 이상의 이미지를 업로드해주세요');
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
        status: Math.random() > 0.7 ? 'safe' : Math.random() > 0.5 ? 'uncertain' : 'danger',
        confidence: Math.floor(Math.random() * 30) + 70,
        message: '제공된 이미지의 시각적 분석을 기반으로 AI 모델이 예비 스크리닝을 완료했습니다.',
        detectedFeatures: [
          '섬유질 질감 감지됨',
          '색상 패턴 분석 완료',
          '표면 특성 평가 완료',
        ],
        recommendations: [
          '상세 분석 보고서를 검토하세요',
          '우려되는 경우 전문 검사를 고려하세요',
          '이 스크리닝 기록을 보관하세요',
        ],
        timestamp: new Date().toISOString(),
      };

      setAnalysisResult(mockResult);
      setCurrentStep('result');
    } catch (err) {
      setError('분석에 실패했습니다. 다시 시도해주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle continue from result
  const handleContinueFromResult = () => {
    if (analysisResult?.status === 'uncertain') {
      setCurrentStep('additional-info');
    } else if (analysisResult?.status === 'danger') {
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
        status: Math.random() > 0.5 ? 'safe' : 'danger',
        confidence: Math.floor(Math.random() * 20) + 80,
        message: '추가 정보를 바탕으로 보다 상세한 분석을 완료했습니다.',
        timestamp: new Date().toISOString(),
      };

      setAnalysisResult(updatedResult);

      if (updatedResult.status === 'danger') {
        handleFetchInspectionCenters();
      } else {
        setCurrentStep('result');
      }
    } catch (err) {
      setError('추가 정보 처리에 실패했습니다. 다시 시도해주세요.');
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
          id: '1',
          name: '서울 석면 검사 센터',
          address: '서울특별시 강남구 강남대로 123',
          distance: 2.3,
          estimatedCost: { min: 150000, max: 300000 },
          inspectionTime: '3-5 영업일',
          rating: 5,
          phone: '02-1234-5678',
          certified: true,
          coordinates: { lat: 37.4979, lng: 127.0276 },
        },
        {
          id: '2',
          name: '한국 환경 분석 연구소',
          address: '서울특별시 강남구 테헤란로 456',
          distance: 3.7,
          estimatedCost: { min: 120000, max: 250000 },
          inspectionTime: '2-4 영업일',
          rating: 4,
          phone: '02-2345-6789',
          certified: true,
          coordinates: { lat: 37.5048, lng: 127.0495 },
        },
        {
          id: '3',
          name: '국가 석면 검사 서비스',
          address: '서울특별시 서초구 양재대로 789',
          distance: 5.2,
          estimatedCost: { min: 100000, max: 200000 },
          inspectionTime: '5-7 영업일',
          rating: 5,
          phone: '02-3456-7890',
          certified: true,
          coordinates: { lat: 37.4833, lng: 127.0322 },
        },
      ];

      setInspectionCenters(mockCenters);
      setCurrentStep('inspection-centers');
    } catch (err) {
      setError('검사소 정보를 불러오는데 실패했습니다. 다시 시도해주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset analysis
  const handleReset = () => {
    // Clean up image previews
    uploadedImages.forEach((img) => URL.revokeObjectURL(img.preview));

    setCurrentStep('upload');
    setUploadedImages([]);
    setAnalysisResult(null);
    setInspectionCenters([]);
    setError(null);
  };

  // Render progress steps
  const renderProgressSteps = () => {
    const steps = [
      { id: 'upload', label: '업로드', number: 1 },
      { id: 'result', label: '결과 확인', number: 2 },
      { id: 'inspection-centers', label: '검사소', number: 3 },
    ];

    const getCurrentStepNumber = () => {
      switch (currentStep) {
        case 'upload': return 1;
        case 'result': return 2;
        case 'additional-info': return 2;
        case 'inspection-centers': return 3;
        default: return 1;
      }
    };

    const currentNumber = getCurrentStepNumber();

    return (
      <div className="flex items-center justify-center gap-4 mb-12">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-300 ${
                  step.number <= currentNumber
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white scale-110'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.number}
              </div>
              <span className={`text-sm mt-2 font-semibold ${step.number <= currentNumber ? 'text-blue-600' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-1.5 rounded-full transition-all duration-300 ${
                  step.number < currentNumber ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-gray-50 min-h-screen py-12 md:py-20">
      <div className="w-full px-6 lg:px-16 xl:px-24">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                석면 분석
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              AI 기반 예비 스크리닝을 위해 이미지를 업로드하세요
            </p>
          </div>

          {/* Progress Steps */}
          {renderProgressSteps()}

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-2xl shadow-lg">
              <p className="text-red-600 text-lg font-semibold">{error}</p>
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <Card className="mb-8">
              <LoadingSpinner size="lg" message="이미지를 분석하고 있습니다..." />
            </Card>
          )}

          {/* Step Content */}
          {!isLoading && (
            <>
              {/* Upload Step */}
              {currentStep === 'upload' && (
                <div className="space-y-8">
                  <ImageUploader onImagesSelected={handleImagesSelected} maxFiles={1} />

                  {/* Image Preview */}
                  {uploadedImages.length > 0 && (
                    <Card title="업로드된 이미지">
                      <div className="grid grid-cols-1 gap-6">
                        {uploadedImages.map((image) => (
                          <div key={image.id} className="relative">
                            <img
                              src={image.preview}
                              alt="업로드됨"
                              className="w-full h-80 object-contain bg-gray-100 rounded-2xl shadow-lg"
                            />
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => setUploadedImages([])}
                              className="absolute top-4 right-4 shadow-xl"
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
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-2xl px-10 py-5 text-xl font-bold rounded-2xl transform hover:scale-105 transition-all"
                        >
                          이미지 분석하기 🔬
                        </Button>
                      </div>
                    </Card>
                  )}
                </div>
              )}

              {/* Result Step */}
              {currentStep === 'result' && analysisResult && (
                <AnalysisResultComponent
                  result={analysisResult}
                  onContinue={handleContinueFromResult}
                  onReset={handleReset}
                />
              )}

              {/* Additional Info Step */}
              {currentStep === 'additional-info' && (
                <AdditionalInfoForm
                  onSubmit={handleAdditionalInfoSubmit}
                  onBack={() => setCurrentStep('result')}
                />
              )}

              {/* Inspection Centers Step */}
              {currentStep === 'inspection-centers' && (
                <div>
                  <InspectionCenterList centers={inspectionCenters} />
                  <div className="mt-10 text-center">
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      size="lg"
                      className="px-10 py-4 text-lg font-bold rounded-2xl border-3 border-blue-600 text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all"
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
    </div>
  );
};
