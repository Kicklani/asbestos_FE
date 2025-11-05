import React from "react";
import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
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
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          width: "100%",
          maxWidth: "1000px",
          padding: "60px 64px 40px",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "70px",
              height: "70px",
              background: "#2563eb",
              borderRadius: "18px",
              boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.25)",
              marginBottom: "20px",
            }}
          >
            <span style={{ fontSize: "36px" }}>🔬</span>
          </div>
        </div>
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "900",
            color: "#111827",
            marginBottom: "16px",
            letterSpacing: "-0.025em",
          }}
        >
          AI 기반 석면 검출
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#4b5563",
            marginBottom: "28px",
            maxWidth: "600px",
            margin: "0 auto 28px",
            fontWeight: "500",
          }}
        >
          첨단 AI 기술을 활용한 석면 재료의 빠르고 정확한 예비 스크리닝
        </p>
        <Link to="/analysis">
          <button
            style={{
              background: "#2563eb",
              color: "white",
              fontSize: "16px",
              fontWeight: "700",
              padding: "14px 36px",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#1d4ed8";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#2563eb";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            분석 시작하기 →
          </button>
        </Link>
      </section>

      {/* Stats */}
      <section
        style={{ width: "100%", maxWidth: "1000px", padding: "40px 64px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "24px",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "14px",
              padding: "28px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              border: "1px solid #f3f4f6",
            }}
          >
            <p
              style={{
                fontSize: "42px",
                fontWeight: "900",
                color: "#2563eb",
                marginBottom: "8px",
              }}
            >
              95%
            </p>
            <p
              style={{ fontSize: "15px", color: "#4b5563", fontWeight: "600" }}
            >
              정확도
            </p>
          </div>
          <div
            style={{
              background: "white",
              borderRadius: "14px",
              padding: "28px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              border: "1px solid #f3f4f6",
            }}
          >
            <p
              style={{
                fontSize: "42px",
                fontWeight: "900",
                color: "#2563eb",
                marginBottom: "8px",
              }}
            >
              &lt;30초
            </p>
            <p
              style={{ fontSize: "15px", color: "#4b5563", fontWeight: "600" }}
            >
              분석 시간
            </p>
          </div>
          <div
            style={{
              background: "white",
              borderRadius: "14px",
              padding: "28px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              border: "1px solid #f3f4f6",
            }}
          >
            <p
              style={{
                fontSize: "42px",
                fontWeight: "900",
                color: "#2563eb",
                marginBottom: "8px",
              }}
            >
              24/7
            </p>
            <p
              style={{ fontSize: "15px", color: "#4b5563", fontWeight: "600" }}
            >
              언제나 이용
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        style={{ width: "100%", maxWidth: "1000px", padding: "50px 64px" }}
      >
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "900",
            textAlign: "center",
            color: "#111827",
            marginBottom: "40px",
          }}
        >
          사용 방법
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "32px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "70px",
                height: "70px",
                background: "#eff6ff",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <span style={{ fontSize: "36px" }}>📸</span>
            </div>
            <h3
              style={{
                fontSize: "17px",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              1. 이미지 업로드
            </h3>
            <p style={{ fontSize: "14px", color: "#4b5563" }}>
              재료 사진을 촬영하여 업로드하세요
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "70px",
                height: "70px",
                background: "#eff6ff",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <span style={{ fontSize: "36px" }}>🤖</span>
            </div>
            <h3
              style={{
                fontSize: "17px",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              2. AI 분석
            </h3>
            <p style={{ fontSize: "14px", color: "#4b5563" }}>
              AI가 즉시 이미지를 분석합니다
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "70px",
                height: "70px",
                background: "#eff6ff",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <span style={{ fontSize: "36px" }}>📊</span>
            </div>
            <h3
              style={{
                fontSize: "17px",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              3. 결과 확인
            </h3>
            <p style={{ fontSize: "14px", color: "#4b5563" }}>
              분석 결과를 확인하세요
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{ width: "100%", maxWidth: "1000px", padding: "40px 64px 60px" }}
      >
        <div
          style={{
            background: "#2563eb",
            borderRadius: "20px",
            padding: "44px",
            textAlign: "center",
            boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "900",
              color: "white",
              marginBottom: "16px",
            }}
          >
            지금 바로 시작하세요
          </h2>
          <p
            style={{ fontSize: "17px", color: "#bfdbfe", marginBottom: "28px" }}
          >
            무료로 석면 검출 서비스를 이용해보세요
          </p>
          <Link to="/analysis">
            <button
              style={{
                background: "white",
                color: "#2563eb",
                fontSize: "16px",
                fontWeight: "700",
                padding: "14px 36px",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#f9fafb";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              무료로 시작하기
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};
