import React from "react";
import { AnalysisResult as AnalysisResultType } from "@/types";

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
          bgColor: "#d1fae5",
          borderColor: "#86efac",
          textColor: "#065f46",
          iconBg: "#a7f3d0",
        };
      case "uncertain":
        return {
          color: "warning",
          icon: "⚠️",
          title: "불확실 - 추가 분석 권장",
          description: "정확한 검출을 위해 추가 정보가 필요합니다.",
          bgColor: "#fef3c7",
          borderColor: "#fde047",
          textColor: "#92400e",
          iconBg: "#fde68a",
        };
      case "danger":
        return {
          color: "danger",
          icon: "🚨",
          title: "잠재적 위험 감지",
          description:
            "재료에 석면이 포함되어 있을 수 있습니다. 전문가 검사가 필요합니다.",
          bgColor: "#fee2e2",
          borderColor: "#fca5a5",
          textColor: "#991b1b",
          iconBg: "#fecaca",
        };
    }
  };

  const config = getStatusConfig(result.status);

  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "32px" }}>
        {/* Status Header */}
        <div
          style={{
            background: config.bgColor,
            border: `2px solid ${config.borderColor}`,
            borderRadius: "16px",
            padding: "28px",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "start", gap: "20px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: config.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span style={{ fontSize: "28px" }}>{config.icon}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "10px",
                }}
              >
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: "900",
                    color: config.textColor,
                  }}
                >
                  {config.title}
                </h3>
                <span
                  style={{
                    background: "white",
                    color: config.textColor,
                    padding: "6px 14px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    fontWeight: "700",
                    border: `2px solid ${config.borderColor}`,
                  }}
                >
                  신뢰도 {result.confidence}%
                </span>
              </div>
              <p
                style={{
                  color: config.textColor,
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}
              >
                {config.description}
              </p>
            </div>
          </div>
        </div>

        {/* Detected Features */}
        {result.detectedFeatures && result.detectedFeatures.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h4
              style={{
                fontWeight: "700",
                color: "#111827",
                marginBottom: "14px",
                fontSize: "15px",
              }}
            >
              🔍 감지된 특징
            </h4>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {result.detectedFeatures.map((feature, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "start",
                    gap: "12px",
                    padding: "14px",
                    background: "#eff6ff",
                    borderRadius: "12px",
                    border: "2px solid #dbeafe",
                  }}
                >
                  <span
                    style={{
                      color: "#2563eb",
                      fontWeight: "700",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span style={{ color: "#1e40af", fontSize: "14px" }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "12px",
            marginTop: "32px",
          }}
        >
          {onReset && (
            <button
              onClick={onReset}
              style={{
                flex: 1,
                background: "white",
                border: "2px solid #2563eb",
                color: "#2563eb",
                padding: "16px",
                fontSize: "15px",
                fontWeight: "700",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#eff6ff")
              }
              onMouseOut={(e) => (e.currentTarget.style.background = "white")}
            >
              새로운 분석 시작
            </button>
          )}
          {onContinue && (
            <button
              onClick={onContinue}
              style={{
                flex: 1,
                background: result.status === "danger" ? "#dc2626" : "#2563eb",
                color: "white",
                padding: "16px",
                fontSize: "15px",
                fontWeight: "700",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                boxShadow: result.status === "danger"
                  ? "0 4px 12px rgba(220, 38, 38, 0.3)"
                  : "0 4px 12px rgba(37, 99, 235, 0.3)",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = result.status === "danger" ? "#b91c1c" : "#1d4ed8")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = result.status === "danger" ? "#dc2626" : "#2563eb")
              }
            >
              {result.status === "uncertain" ? "추가 정보 제공하기 →" : "검사소 찾기 →"}
            </button>
          )}
        </div>

        {/* Timestamp */}
        <div
          style={{
            marginTop: "24px",
            paddingTop: "20px",
            borderTop: "2px solid #f3f4f6",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "13px", color: "#6b7280" }}>
            분석 시간: {new Date(result.timestamp).toLocaleString("ko-KR")}
          </p>
        </div>
      </div>
    </div>
  );
};
