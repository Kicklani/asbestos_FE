import React, { useCallback, useState } from "react";

interface ImageUploaderProps {
  onImagesSelected: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesSelected,
  maxFiles = 5,
  accept = "image/*",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFiles = (files: FileList | null): File[] => {
    if (!files || files.length === 0) return [];

    const fileArray = Array.from(files);
    const validFiles: File[] = [];

    for (const file of fileArray) {
      if (!file.type.startsWith("image/")) {
        setError("이미지 파일만 허용됩니다");
        continue;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("파일 크기는 10MB 이하여야 합니다");
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length > maxFiles) {
      setError(`최대 ${maxFiles}개의 파일만 허용됩니다`);
      return validFiles.slice(0, maxFiles);
    }

    setError(null);
    return validFiles;
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const files = validateFiles(e.dataTransfer.files);
      if (files.length > 0) {
        onImagesSelected(files);
      }
    },
    [onImagesSelected, maxFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = validateFiles(e.target.files);
    if (files.length > 0) {
      onImagesSelected(files);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          border: "3px dashed",
          borderColor: isDragging ? "#2563eb" : "#d1d5db",
          borderRadius: "20px",
          padding: "80px 60px",
          textAlign: "center",
          transition: "all 0.2s",
          background: isDragging ? "#eff6ff" : "white",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
              background: isDragging ? "#2563eb" : "#f3f4f6",
            }}
          >
            <svg
              style={{
                width: "36px",
                height: "36px",
                color: isDragging ? "white" : "#9ca3af",
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          <div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              이미지를 드래그 앤 드롭하세요
            </h3>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              또는 클릭하여 파일을 선택하세요
            </p>
          </div>

          <label style={{ cursor: "pointer" }}>
            <div
              style={{
                background: "#2563eb",
                color: "white",
                padding: "16px 48px",
                borderRadius: "12px",
                fontWeight: "700",
                fontSize: "15px",
                transition: "all 0.2s",
                display: "inline-block",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#1d4ed8")
              }
              onMouseOut={(e) => (e.currentTarget.style.background = "#2563eb")}
            >
              파일 선택하기
            </div>
            <input
              type="file"
              accept={accept}
              multiple={maxFiles > 1}
              onChange={handleFileInput}
              style={{ display: "none" }}
            />
          </label>

          <p style={{ fontSize: "13px", color: "#9ca3af" }}>
            최대 1개 파일, 각 파일당 최대 10MB
          </p>
        </div>
      </div>

      {error && (
        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            background: "#fef2f2",
            border: "2px solid #fecaca",
            borderRadius: "12px",
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
    </div>
  );
};
