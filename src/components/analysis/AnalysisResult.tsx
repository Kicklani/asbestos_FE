import React from "react";
import { AnalysisResult as AnalysisResultType } from "@/types";
import { Badge, Button } from "@/components/common";

interface AnalysisResultProps {
  result: AnalysisResultType;
  onContinue?: () => void;
  onReset?: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({
  result,
  onContinue,
  onReset,
}) => {
  const getStatusConfig = (status: AnalysisResultType["status"]) => {
    switch (status) {
      case "safe":
        return {
          color: "success",
          icon: "✅",
          title: "안전 - 석면 미검출",
          description: "AI 분석 결과, 이 재료는 안전한 것으로 보입니다.",
          bgColor: "bg-green-50",
          borderColor: "border-green-300",
          textColor: "text-green-900",
          iconBg: "bg-green-200",
        };
      case "uncertain":
        return {
          color: "warning",
          icon: "⚠️",
          title: "불확실 - 추가 분석 권장",
          description: "정확한 검출을 위해 추가 정보가 필요합니다.",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-300",
          textColor: "text-yellow-900",
          iconBg: "bg-yellow-200",
        };
      case "danger":
        return {
          color: "danger",
          icon: "🚨",
          title: "잠재적 위험 감지",
          description:
            "재료에 석면이 포함되어 있을 수 있습니다. 전문가 검사가 필요합니다.",
          bgColor: "bg-red-50",
          borderColor: "border-red-300",
          textColor: "text-red-900",
          iconBg: "bg-red-200",
        };
    }
  };

  const config = getStatusConfig(result.status);

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      <div className="p-8 md:p-10">
        {/* Status Header */}
        <div
          className={`${config.bgColor} ${config.borderColor} border-2 rounded-2xl p-8 mb-8`}
        >
          <div className="flex items-start gap-6">
            <div
              className={`w-16 h-16 rounded-2xl ${config.iconBg} flex items-center justify-center flex-shrink-0 shadow-md`}
            >
              <span className="text-3xl">{config.icon}</span>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h3 className={`text-2xl font-extrabold ${config.textColor}`}>
                  {config.title}
                </h3>
                <Badge variant={config.color as any} size="md">
                  신뢰도 {result.confidence}%
                </Badge>
              </div>
              <p className={`${config.textColor} text-base leading-relaxed`}>
                {config.description}
              </p>
            </div>
          </div>
        </div>

        {/* Analysis Message */}
        <div className="mb-8 p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3 text-lg">
            📋 분석 메시지
          </h4>
          <p className="text-gray-700 leading-relaxed">{result.message}</p>
        </div>

        {/* Detected Features */}
        {result.detectedFeatures && result.detectedFeatures.length > 0 && (
          <div className="mb-8">
            <h4 className="font-bold text-gray-900 mb-4 text-lg">
              🔍 감지된 특징
            </h4>
            <ul className="space-y-3">
              {result.detectedFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border-2 border-blue-100"
                >
                  <span className="text-blue-600 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        {result.recommendations && result.recommendations.length > 0 && (
          <div className="mb-8">
            <h4 className="font-bold text-gray-900 mb-4 text-lg">
              💡 권장 사항
            </h4>
            <ul className="space-y-3">
              {result.recommendations.map((rec, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl border-2 border-indigo-100"
                >
                  <span className="text-indigo-600 font-bold flex-shrink-0">
                    →
                  </span>
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          {result.status === "uncertain" && onContinue && (
            <Button
              onClick={onContinue}
              variant="primary"
              size="lg"
              className="flex-1 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              추가 정보 제공하기 →
            </Button>
          )}
          {result.status === "danger" && onContinue && (
            <Button
              onClick={onContinue}
              variant="danger"
              size="lg"
              className="flex-1 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              검사소 찾기 →
            </Button>
          )}
          {onReset && (
            <Button
              onClick={onReset}
              variant="outline"
              size="lg"
              className="flex-1 py-4 text-lg font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              새로운 분석 시작
            </Button>
          )}
        </div>

        {/* Timestamp */}
        <div className="mt-8 pt-6 border-t-2 border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            분석 시간: {new Date(result.timestamp).toLocaleString("ko-KR")}
          </p>
        </div>
      </div>
    </div>
  );
};
