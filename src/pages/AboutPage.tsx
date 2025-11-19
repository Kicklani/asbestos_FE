import React from "react";

export const AboutPage: React.FC = () => {
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
            석면 검출 서비스
          </h1>
          <p style={{ fontSize: "16px", color: "#4b5563" }}>
            AI 기반 예비 스크리닝으로 안전한 환경을 만듭니다
          </p>
        </div>

        {/* Mission */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            padding: "32px",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "16px",
            }}
          >
            우리의 미션
          </h2>
          <p
            style={{
              color: "#4b5563",
              lineHeight: "1.6",
              marginBottom: "12px",
              fontSize: "15px",
            }}
          >
            석면 노출은 전 세계적으로 심각한 건강 문제로 남아있습니다. 우리의
            미션은 인공지능의 힘을 통해 모든 사람이 빠르고 저렴하게 예비 석면
            스크리닝을 이용할 수 있도록 만드는 것입니다.
          </p>
          <p style={{ color: "#4b5563", lineHeight: "1.6", fontSize: "15px" }}>
            조기 발견과 인식이 석면 관련 건강 문제를 예방하는 핵심이라고
            믿습니다.
          </p>
        </div>

        {/* How It Works */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            padding: "32px",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "20px",
            }}
          >
            사용 방법
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", gap: "12px" }}>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#2563eb",
                }}
              >
                1.
              </span>
              <div>
                <h3
                  style={{
                    fontWeight: "700",
                    color: "#111827",
                    marginBottom: "6px",
                    fontSize: "16px",
                  }}
                >
                  이미지 업로드
                </h3>
                <p style={{ color: "#6b7280", fontSize: "14px" }}>
                  분석하려는 재료의 선명한 사진을 촬영하세요.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#2563eb",
                }}
              >
                2.
              </span>
              <div>
                <h3
                  style={{
                    fontWeight: "700",
                    color: "#111827",
                    marginBottom: "6px",
                    fontSize: "16px",
                  }}
                >
                  AI 분석
                </h3>
                <p style={{ color: "#6b7280", fontSize: "14px" }}>
                  AI가 몇 초 만에 이미지를 분석합니다.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#2563eb",
                }}
              >
                3.
              </span>
              <div>
                <h3
                  style={{
                    fontWeight: "700",
                    color: "#111827",
                    marginBottom: "6px",
                    fontSize: "16px",
                  }}
                >
                  결과 확인
                </h3>
                <p style={{ color: "#6b7280", fontSize: "14px" }}>
                  신뢰도 수준과 함께 예비 평가를 제공합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          style={{
            background: "#fef3c7",
            border: "2px solid #fde047",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "12px", alignItems: "start" }}>
            <span style={{ fontSize: "24px", flexShrink: 0 }}>⚠️</span>
            <div>
              <p
                style={{
                  fontWeight: "700",
                  color: "#92400e",
                  marginBottom: "8px",
                  fontSize: "16px",
                }}
              >
                중요 안내사항
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#92400e",
                  marginBottom: "8px",
                }}
              >
                본 서비스는 예비 스크리닝 도구입니다.
              </p>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  fontSize: "14px",
                  color: "#92400e",
                  paddingLeft: "0",
                  listStyle: "none",
                }}
              >
                <li>• 결과는 전문 실험실 분석을 대체할 수 없습니다</li>
                <li>• 최종 확인은 항상 인증된 전문가와 상담하시기 바랍니다</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
