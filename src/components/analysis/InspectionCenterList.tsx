import React, { useState } from "react";
import { InspectionCenter } from "@/types";

interface InspectionCenterListProps {
  centers: InspectionCenter[];
  userLocation?: { lat: number; lng: number };
}

export const InspectionCenterList: React.FC<InspectionCenterListProps> = ({
  centers,
}) => {
  const [selectedCenter, setSelectedCenter] = useState<InspectionCenter | null>(
    null
  );

  const formatDistance = (distance: number) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };

  if (centers.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "48px",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p style={{ fontSize: "18px", fontWeight: "700", color: "#6b7280" }}>
          검사소를 찾을 수 없습니다
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "900",
            color: "#111827",
            marginBottom: "8px",
          }}
        >
          근처 검사소
        </h2>
        <p style={{ fontSize: "15px", color: "#6b7280" }}>
          근처에서 {centers.length}개의 인증된 검사소를 찾았습니다
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {centers.map((center) => (
          <div
            key={center.id}
            onClick={() => setSelectedCenter(center)}
            style={{
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              padding: "24px",
              cursor: "pointer",
              transition: "all 0.2s",
              border: "2px solid #e5e7eb",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#3b82f6";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(59, 130, 246, 0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(0, 0, 0, 0.08)";
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#111827",
                  }}
                >
                  {center.name}
                </h3>
                {center.certified && (
                  <span
                    style={{
                      background: "#d1fae5",
                      color: "#065f46",
                      padding: "4px 10px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    인증
                  </span>
                )}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                fontSize: "14px",
                color: "#4b5563",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span style={{ fontSize: "16px" }}>📍</span>
                <span>{center.address}</span>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span style={{ fontSize: "16px" }}>📞</span>
                <span>{center.phone}</span>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span style={{ fontSize: "16px" }}>🚗</span>
                <span>{formatDistance(center.distance)} 거리</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedCenter && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setSelectedCenter(null)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
              padding: "32px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "24px",
              }}
            >
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "900",
                  color: "#111827",
                }}
              >
                {selectedCenter.name}
              </h3>
              {selectedCenter.certified && (
                <span
                  style={{
                    background: "#d1fae5",
                    color: "#065f46",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  인증
                </span>
              )}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <div>
                <p
                  style={{
                    fontWeight: "700",
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  주소
                </p>
                <p style={{ color: "#6b7280" }}>{selectedCenter.address}</p>
              </div>

              <div>
                <p
                  style={{
                    fontWeight: "700",
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  전화번호
                </p>
                <p style={{ color: "#6b7280" }}>{selectedCenter.phone}</p>
              </div>

              <div>
                <p
                  style={{
                    fontWeight: "700",
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  거리
                </p>
                <p style={{ color: "#6b7280" }}>
                  {formatDistance(selectedCenter.distance)}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setSelectedCenter(null)}
                style={{
                  flex: 1,
                  background: "white",
                  border: "2px solid #e5e7eb",
                  color: "#4b5563",
                  padding: "14px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: "600",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#f9fafb")
                }
                onMouseOut={(e) => (e.currentTarget.style.background = "white")}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
