import React, { useCallback, useState } from 'react';
import { Card } from '@/components/common';

interface ImageUploaderProps {
  onImagesSelected: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesSelected,
  maxFiles = 5,
  accept = 'image/*',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFiles = (files: FileList | null): File[] => {
    if (!files || files.length === 0) return [];

    const fileArray = Array.from(files);
    const validFiles: File[] = [];

    for (const file of fileArray) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('이미지 파일만 허용됩니다');
        continue;
      }

      // Check file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        setError('파일 크기는 10MB 이하여야 합니다');
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
    <Card className="transition-all duration-200 bg-white rounded-3xl shadow-2xl border-2 border-blue-100">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-3 border-dashed rounded-2xl p-10 md:p-12 text-center transition-all duration-300 ${
          isDragging
            ? 'border-blue-500 bg-blue-50 scale-105'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          {/* Upload Icon */}
          <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
            isDragging ? 'bg-gradient-to-br from-blue-500 to-indigo-600 scale-110' : 'bg-gradient-to-br from-gray-100 to-gray-200'
          }`}>
            <svg
              className={`w-10 h-10 ${isDragging ? 'text-white' : 'text-gray-600'}`}
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

          {/* Instructions */}
          <div>
            <p className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              {isDragging ? '이미지를 여기에 놓으세요' : '이미지를 드래그 앤 드롭하세요'}
            </p>
            <p className="text-base text-gray-500">또는 클릭하여 파일을 선택하세요</p>
          </div>

          {/* File Input */}
          <input
            type="file"
            accept={accept}
            multiple={maxFiles > 1}
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-lg font-bold hover:from-blue-700 hover:to-indigo-700 cursor-pointer transition-all duration-300 shadow-xl hover:scale-105 transform"
          >
            파일 선택하기 📁
          </label>

          {/* Info */}
          <p className="text-sm text-gray-500 font-medium">
            최대 {maxFiles}개 파일, 각 파일당 최대 10MB
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl shadow-md">
          <p className="text-base text-red-600 font-semibold">{error}</p>
        </div>
      )}
    </Card>
  );
};
