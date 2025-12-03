import React, { useState } from "react";
import {
  ImageUploader,
  AnalysisResult as AnalysisResultComponent,
  AdditionalInfoForm,
  InspectionCenterList,
} from "@/components/analysis";
import { LoadingSpinner } from "@/components/common";
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
  const [loadingMessage, setLoadingMessage] = useState<string>("이미지를 분석하고 있습니다...");
  const [error, setError] = useState<string | null>(null);

  const handleImagesSelected = async (files: File[]) => {
    const newImages: ImageUpload[] = files.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString(),
    }));

    setUploadedImages(newImages);
  };

  const handleAnalyze = async () => {
    if (uploadedImages.length === 0) {
      setError("최소 한 개 이상의 이미지를 업로드해주세요");
      return;
    }

    setIsLoading(true);
    setLoadingMessage("이미지를 분석하고 있습니다...");
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

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

      // 분석 완료 후 검사소 목록도 미리 가져오기
      await fetchInspectionCentersData();

      setCurrentStep("result");
    } catch (err) {
      setError("분석에 실패했습니다. 다시 시도해주세요.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInspectionCentersData = async () => {
    try {
      // 경상국립대학교 가좌캠퍼스 기준 가까운 검사소 5곳
      const mockCenters: InspectionCenter[] = [
        {
          id: "1",
          name: "진주보건환경연구원",
          address: "경남 진주시 동진로 169",
          distance: 3.2,
          estimatedCost: { min: 150000, max: 300000 },
          inspectionTime: "3-5 영업일",
          rating: 4.7,
          phone: "055-749-5900",
          certified: true,
        },
        {
          id: "2",
          name: "경남환경연구원",
          address: "경남 진주시 칠암동 951-7",
          distance: 4.5,
          estimatedCost: { min: 180000, max: 350000 },
          inspectionTime: "2-4 영업일",
          rating: 4.8,
          phone: "055-754-8801",
          certified: true,
        },
        {
          id: "3",
          name: "한국환경공단 경남지사",
          address: "경남 창원시 성산구 중앙대로 151",
          distance: 28.5,
          estimatedCost: { min: 200000, max: 400000 },
          inspectionTime: "3-5 영업일",
          rating: 4.6,
          phone: "055-269-0500",
          certified: true,
        },
        {
          id: "4",
          name: "㈜케이씨엘",
          address: "경남 진주시 문산읍 삼곡리 333-1",
          distance: 12.8,
          estimatedCost: { min: 170000, max: 320000 },
          inspectionTime: "2-3 영업일",
          rating: 4.5,
          phone: "055-761-5400",
          certified: true,
        },
        {
          id: "5",
          name: "부산시보건환경연구원",
          address: "부산광역시 북구 덕천동 363-14",
          distance: 65.3,
          estimatedCost: { min: 160000, max: 310000 },
          inspectionTime: "4-6 영업일",
          rating: 4.7,
          phone: "051-309-2800",
          certified: true,
        },
      ];

      setInspectionCenters(mockCenters);
    } catch (err) {
      console.error("Failed to fetch inspection centers:", err);
    }
  };

  const handleContinueFromResult = () => {
    if (analysisResult?.status === "uncertain") {
      setCurrentStep("additional-info");
    } else {
      // danger 또는 safe 상태 모두 검사소 페이지로 이동
      handleFetchInspectionCenters();
    }
  };

  const handleAdditionalInfoSubmit = async (_info: AdditionalInfo) => {
    setIsLoading(true);
    setLoadingMessage("추가 정보를 분석하고 있습니다...");
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

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

  const handleFetchInspectionCenters = async () => {
    setIsLoading(true);
    setLoadingMessage("주변 검사소를 찾고 있습니다...");
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 경상국립대학교 가좌캠퍼스 기준 가까운 검사소 5곳
      const mockCenters: InspectionCenter[] = [
        {
          id: "1",
          name: "진주보건환경연구원",
          address: "경남 진주시 동진로 169",
          distance: 3.2,
          estimatedCost: { min: 150000, max: 300000 },
          inspectionTime: "3-5 영업일",
          rating: 4.7,
          phone: "055-749-5900",
          certified: true,
        },
        {
          id: "2",
          name: "경남환경연구원",
          address: "경남 진주시 칠암동 951-7",
          distance: 4.5,
          estimatedCost: { min: 180000, max: 350000 },
          inspectionTime: "2-4 영업일",
          rating: 4.8,
          phone: "055-754-8801",
          certified: true,
        },
        {
          id: "3",
          name: "한국환경공단 경남지사",
          address: "경남 창원시 성산구 중앙대로 151",
          distance: 28.5,
          estimatedCost: { min: 200000, max: 400000 },
          inspectionTime: "3-5 영업일",
          rating: 4.6,
          phone: "055-269-0500",
          certified: true,
        },
        {
          id: "4",
          name: "㈜케이씨엘",
          address: "경남 진주시 문산읍 삼곡리 333-1",
          distance: 12.8,
          estimatedCost: { min: 170000, max: 320000 },
          inspectionTime: "2-3 영업일",
          rating: 4.5,
          phone: "055-761-5400",
          certified: true,
        },
        {
          id: "5",
          name: "부산시보건환경연구원",
          address: "부산광역시 북구 덕천동 363-6",
          distance: 65.3,
          estimatedCost: { min: 150000, max: 280000 },
          inspectionTime: "4-6 영업일",
          rating: 4.9,
          phone: "051-309-2800",
          certified: true,
        },
      ];

      setInspectionCenters(mockCenters);
      setCurrentStep("inspection-centers");
    } catch (err) {
      setError("검사소 정보를 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    uploadedImages.forEach((img) => URL.revokeObjectURL(img.preview));
    setCurrentStep("upload");
    setUploadedImages([]);
    setAnalysisResult(null);
    setInspectionCenters([]);
    setError(null);
  };

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontSize: "16px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s",
                  background:
                    step.number <= currentNumber ? "#2563eb" : "#e5e7eb",
                  color: step.number <= currentNumber ? "white" : "#6b7280",
                  transform:
                    step.number <= currentNumber ? "scale(1.1)" : "scale(1)",
                }}
              >
                {step.number}
              </div>
              <span
                style={{
                  fontSize: "13px",
                  marginTop: "8px",
                  fontWeight: "600",
                  color: step.number <= currentNumber ? "#2563eb" : "#9ca3af",
                }}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                style={{
                  width: "60px",
                  height: "3px",
                  borderRadius: "9999px",
                  transition: "all 0.3s",
                  background:
                    step.number < currentNumber ? "#2563eb" : "#e5e7eb",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #ffffff 0%, #f0f7ff 50%, #ffffff 100%)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "50px",
        paddingBottom: "50px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "800px", padding: "0 40px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "40px",
              fontWeight: "900",
              color: "#111827",
              marginBottom: "12px",
            }}
          >
            석면 분석
          </h1>
          <p style={{ fontSize: "16px", color: "#4b5563" }}>
            AI 기반 예비 스크리닝을 위해 이미지를 업로드하세요
          </p>
        </div>

        {/* Progress Steps */}
        {renderProgressSteps()}

        {/* Error Message */}
        {error && (
          <div
            style={{
              marginBottom: "24px",
              padding: "20px",
              background: "#fef2f2",
              border: "2px solid #fecaca",
              borderRadius: "16px",
            }}
          >
            <p
              style={{
                color: "#dc2626",
                fontWeight: "600",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              {error}
            </p>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div
            style={{
              marginBottom: "24px",
              background: "white",
              borderRadius: "20px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              padding: "48px",
            }}
          >
            <LoadingSpinner size="lg" message={loadingMessage} />
          </div>
        )}

        {/* Step Content */}
        {!isLoading && (
          <>
            {/* Upload Step */}
            {currentStep === "upload" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                <ImageUploader
                  onImagesSelected={handleImagesSelected}
                  maxFiles={1}
                />

                {/* Image Preview */}
                {uploadedImages.length > 0 && (
                  <div
                    style={{
                      background: "white",
                      borderRadius: "20px",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ padding: "28px" }}>
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "#111827",
                          marginBottom: "20px",
                        }}
                      >
                        업로드된 이미지
                      </h3>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr",
                          gap: "20px",
                        }}
                      >
                        {uploadedImages.map((image) => (
                          <div
                            key={image.id}
                            style={{
                              position: "relative",
                              borderRadius: "16px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={image.preview}
                              alt="업로드됨"
                              style={{
                                width: "100%",
                                height: "320px",
                                objectFit: "contain",
                                background: "#f3f4f6",
                                borderRadius: "16px",
                              }}
                            />
                            <button
                              onClick={() => setUploadedImages([])}
                              style={{
                                position: "absolute",
                                top: "12px",
                                right: "12px",
                                background: "#dc2626",
                                color: "white",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "13px",
                                fontWeight: "600",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                              }}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.background = "#b91c1c")
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.background = "#dc2626")
                              }
                            >
                              삭제
                            </button>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: "24px" }}>
                        <button
                          onClick={handleAnalyze}
                          style={{
                            width: "100%",
                            background: "#2563eb",
                            color: "white",
                            padding: "16px",
                            fontSize: "16px",
                            fontWeight: "700",
                            borderRadius: "12px",
                            border: "none",
                            cursor: "pointer",
                            boxShadow: "0 10px 20px rgba(37, 99, 235, 0.3)",
                            transition: "all 0.2s",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = "#1d4ed8";
                            e.currentTarget.style.transform = "scale(1.02)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = "#2563eb";
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        >
                          이미지 분석하기 →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Result Step */}
            {currentStep === "result" && analysisResult && (
              <AnalysisResultComponent
                result={analysisResult}
                onContinue={handleContinueFromResult}
                onReset={handleReset}
                uploadedImages={uploadedImages.map(img => img.preview)}
                inspectionCenters={inspectionCenters}
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
                <div style={{ marginTop: "32px", textAlign: "center" }}>
                  <button
                    onClick={handleReset}
                    style={{
                      background: "white",
                      border: "2px solid #2563eb",
                      color: "#2563eb",
                      padding: "14px 36px",
                      fontSize: "16px",
                      fontWeight: "700",
                      borderRadius: "12px",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "#eff6ff";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "white";
                    }}
                  >
                    새로운 분석 시작하기
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
