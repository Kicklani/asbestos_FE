import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: "white",
        borderTop: "1px solid #e5e7eb",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "auto",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1200px", padding: "40px 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
            marginBottom: "32px",
          }}
        >
          {/* 브랜드 섹션 */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: "#2563eb",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "16px" }}>🔬</span>
              </div>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "900",
                  color: "#111827",
                }}
              >
                석면 검출기
              </span>
            </div>
            <p
              style={{ fontSize: "13px", color: "#6b7280", lineHeight: "1.6" }}
            >
              AI 기반 석면 검출 예비 스크리닝 서비스. 빠르고 쉽게, 누구나 접근
              가능합니다.
            </p>
          </div>

          {/* 바로가기 */}
          <div>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "12px",
              }}
            >
              바로가기
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <li>
                <Link
                  to="/"
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#2563eb")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#6b7280")}
                >
                  홈
                </Link>
              </li>
              <li>
                <Link
                  to="/analysis"
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#2563eb")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#6b7280")}
                >
                  분석 시작하기
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#2563eb")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#6b7280")}
                >
                  서비스 소개
                </Link>
              </li>
            </ul>
          </div>

          {/* 법적 고지 */}
          <div>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "12px",
              }}
            >
              법적 고지
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <li>
                <a
                  href="#"
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#2563eb")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#6b7280")}
                >
                  개인정보 처리방침
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#2563eb")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#6b7280")}
                >
                  이용약관
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#2563eb")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#6b7280")}
                >
                  고객 지원
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 중요 안내사항 */}
        <div
          style={{
            padding: "16px",
            background: "#fef3c7",
            border: "2px solid #fde047",
            borderRadius: "12px",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "start", gap: "10px" }}>
            <span style={{ fontSize: "16px", flexShrink: 0 }}>⚠️</span>
            <div>
              <h4
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#92400e",
                  marginBottom: "4px",
                }}
              >
                중요 안내사항
              </h4>
              <p
                style={{
                  fontSize: "12px",
                  color: "#78350f",
                  lineHeight: "1.5",
                }}
              >
                본 애플리케이션은 예비 스크리닝 목적으로만 제공되며 전문가의
                분석을 대체할 수 없습니다. 석면 관련 최종 확인 결정시 반드시
                인증된 전문가와 상담하시기 바랍니다.
              </p>
            </div>
          </div>
        </div>

        {/* 저작권 */}
        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            paddingTop: "20px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "12px", color: "#9ca3af" }}>
            © 2025 석면 검출기. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
