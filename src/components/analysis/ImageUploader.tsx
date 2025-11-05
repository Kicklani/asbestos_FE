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
    <div className="w-full">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-3xl p-20 text-center transition-all duration-200 bg-white ${
          isDragging
            ? "border-blue-500 bg-blue-50 scale-[1.02]"
            : "border-gray-300 hover:border-blue-400"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-200 ${
              isDragging ? "bg-blue-600" : "bg-gray-100"
            }`}
          >
            <svg
              className={`w-10 h-10 ${
                isDragging ? "text-white" : "text-gray-400"
              }`}
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
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              이미지를 드래그 앤 드롭하세요
            </h3>
            <p className="text-base text-gray-500">
              또는 클릭하여 파일을 선택하세요
            </p>
          </div>

          <label className="cursor-pointer">
            <div className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all duration-200 hover:scale-105">
              파일 선택하기
            </div>
            <input
              type="file"
              accept={accept}
              multiple={maxFiles > 1}
              onChange={handleFileInput}
              className="hidden"
            />
          </label>

          <p className="text-sm text-gray-400">
            최대 1개 파일, 각 파일당 최대 10MB
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 font-medium text-center">{error}</p>
        </div>
      )}
    </div>
  );
};
