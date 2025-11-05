import React, { useState } from 'react';
import { Card, Input, Button } from '@/components/common';
import { AdditionalInfo, ImageUpload } from '@/types';
import { ImageUploader } from './ImageUploader';

interface AdditionalInfoFormProps {
  onSubmit: (info: AdditionalInfo) => void;
  onBack?: () => void;
}

export const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({
  onSubmit,
  onBack,
}) => {
  const [location, setLocation] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [depth, setDepth] = useState('');
  const [unit, setUnit] = useState<'cm' | 'mm'>('cm');
  const [notes, setNotes] = useState('');
  const [additionalImages, setAdditionalImages] = useState<ImageUpload[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleImagesSelected = (files: File[]) => {
    const newImages: ImageUpload[] = files.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString(),
    }));

    setAdditionalImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    setAdditionalImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!location.trim()) {
      newErrors.location = '위치는 필수 입력 항목입니다';
    }

    if (!width || parseFloat(width) <= 0) {
      newErrors.width = '유효한 너비를 입력하세요';
    }

    if (!height || parseFloat(height) <= 0) {
      newErrors.height = '유효한 높이를 입력하세요';
    }

    if (!depth || parseFloat(depth) <= 0) {
      newErrors.depth = '유효한 깊이를 입력하세요';
    }

    if (additionalImages.length === 0) {
      newErrors.images = '최소 한 개 이상의 추가 이미지를 업로드하세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const info: AdditionalInfo = {
      location: location.trim(),
      size: {
        width: parseFloat(width),
        height: parseFloat(height),
        depth: parseFloat(depth),
        unit,
      },
      additionalImages,
      notes: notes.trim() || undefined,
    };

    onSubmit(info);
  };

  return (
    <Card title="추가 정보" subtitle="보다 정확한 분석을 위해 정보를 입력해주세요" className="bg-white rounded-3xl shadow-2xl border-2 border-blue-100">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Location */}
        <Input
          label="위치"
          placeholder="이 재료를 어디에서 발견했나요?"
          value={location}
          onChange={setLocation}
          error={errors.location}
          required
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />

        {/* Size Measurements */}
        <div>
          <label className="block text-base font-bold text-gray-700 mb-4">
            크기 측정 <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <Input
              label="너비"
              placeholder="0"
              type="number"
              value={width}
              onChange={setWidth}
              error={errors.width}
              required
            />
            <Input
              label="높이"
              placeholder="0"
              type="number"
              value={height}
              onChange={setHeight}
              error={errors.height}
              required
            />
            <Input
              label="깊이"
              placeholder="0"
              type="number"
              value={depth}
              onChange={setDepth}
              error={errors.depth}
              required
            />
          </div>

          {/* Unit Selection */}
          <div className="flex gap-6 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="unit"
                value="cm"
                checked={unit === 'cm'}
                onChange={() => setUnit('cm')}
                className="w-5 h-5 text-blue-600"
              />
              <span className="text-base font-semibold text-gray-700">센티미터 (cm)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="unit"
                value="mm"
                checked={unit === 'mm'}
                onChange={() => setUnit('mm')}
                className="w-5 h-5 text-blue-600"
              />
              <span className="text-base font-semibold text-gray-700">밀리미터 (mm)</span>
            </label>
          </div>
        </div>

        {/* Additional Images */}
        <div>
          <label className="block text-base font-bold text-gray-700 mb-4">
            추가 이미지 <span className="text-red-500">*</span>
          </label>
          <ImageUploader onImagesSelected={handleImagesSelected} maxFiles={5} />
          {errors.images && (
            <p className="text-base text-red-600 mt-3 font-semibold">{errors.images}</p>
          )}

          {/* Image Previews */}
          {additionalImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-6">
              {additionalImages.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.preview}
                    alt="미리보기"
                    className="w-full h-36 object-cover rounded-xl border-3 border-gray-200 shadow-md group-hover:shadow-xl transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notes */}
        <Input
          label="추가 메모"
          placeholder="기타 관련 정보를 입력하세요..."
          value={notes}
          onChange={setNotes}
          type="textarea"
        />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          {onBack && (
            <Button type="button" onClick={onBack} variant="outline" className="px-8 py-4 text-lg font-bold rounded-2xl border-3 border-blue-600 text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all">
              뒤로 가기
            </Button>
          )}
          <Button type="submit" variant="primary" className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl px-10 py-4 text-xl font-bold rounded-2xl transform hover:scale-105 transition-all">
            분석 계속하기 →
          </Button>
        </div>
      </form>
    </Card>
  );
};
