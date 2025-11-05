import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "홈" },
    { path: "/analysis", label: "분석하기" },
    { path: "/about", label: "서비스 소개" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      style={{
        background: "white",
        borderBottom: "1px solid #e5e7eb",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          padding: "0 32px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "#2563eb",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "20px" }}>🔬</span>
          </div>
          <div>
            <span
              style={{ fontSize: "18px", fontWeight: "900", color: "#111827" }}
            >
              석면 검출기
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginLeft: "8px",
                display: "none",
              }}
              className="sm-inline"
            >
              AI 석면 분석 서비스
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
          className="hidden-mobile"
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "600",
                textDecoration: "none",
                transition: "all 0.2s",
                background: isActive(item.path) ? "#2563eb" : "transparent",
                color: isActive(item.path) ? "white" : "#374151",
              }}
              onMouseOver={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.background = "#f3f4f6";
                }
              }}
              onMouseOut={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: "none",
            padding: "8px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            borderRadius: "8px",
          }}
          className="show-mobile"
          aria-label="메뉴 토글"
          onMouseOver={(e) => (e.currentTarget.style.background = "#f3f4f6")}
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <svg
            style={{ width: "24px", height: "24px", color: "#374151" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav
          style={{
            borderTop: "1px solid #e5e7eb",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            background: "white",
          }}
          className="show-mobile"
        >
          <div
            style={{ width: "100%", maxWidth: "1200px", padding: "16px 32px" }}
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  textDecoration: "none",
                  background: isActive(item.path) ? "#2563eb" : "transparent",
                  color: isActive(item.path) ? "white" : "#374151",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile {
            display: none !important;
          }
          .show-mobile {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .sm-inline {
            display: inline !important;
          }
        }
      `}</style>
    </header>
  );
};
