import React, { useState } from 'react';
import { Input, Button } from '@/components/common';
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
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #ffffff 0%, #f0f7ff 50%, #ffffff 100%)',
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '700px',
        }}
      >
        {/* 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: '900',
              color: '#111827',
              marginBottom: '12px',
            }}
          >
            추가 정보 입력
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            보다 정확한 분석을 위해 상세 정보를 제공해주세요
          </p>
        </div>

        {/* 폼 카드 */}
        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            padding: '40px',
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Location */}
        <Input
          label="위치"
          placeholder="이 재료를 어디에서 발견했나요?"
          value={location}
          onChange={setLocation}
          error={errors.location}
          required
        />

            {/* Size Measurements */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '16px',
                }}
              >
                📏 크기 측정 <span style={{ color: '#ef4444' }}>*</span>
              </label>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px',
                  marginBottom: '16px',
                }}
              >
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
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '16px',
                  background: '#f0f7ff',
                  borderRadius: '12px',
                  border: '1px solid #2563eb',
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    flex: 1,
                  }}
                >
                  <input
                    type="radio"
                    name="unit"
                    value="cm"
                    checked={unit === 'cm'}
                    onChange={() => setUnit('cm')}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#111827' }}>
                    센티미터 (cm)
                  </span>
                </label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    flex: 1,
                  }}
                >
                  <input
                    type="radio"
                    name="unit"
                    value="mm"
                    checked={unit === 'mm'}
                    onChange={() => setUnit('mm')}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#111827' }}>
                    밀리미터 (mm)
                  </span>
                </label>
              </div>
            </div>

            {/* Additional Images */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '16px',
                }}
              >
                📷 추가 이미지 <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <ImageUploader onImagesSelected={handleImagesSelected} maxFiles={5} />
              {errors.images && (
                <p
                  style={{
                    fontSize: '14px',
                    color: '#dc2626',
                    marginTop: '12px',
                    fontWeight: '600',
                    padding: '12px',
                    background: '#fee2e2',
                    borderRadius: '8px',
                  }}
                >
                  {errors.images}
                </p>
              )}

              {/* Image Previews */}
              {additionalImages.length > 0 && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '20px',
                    marginTop: '20px',
                  }}
                >
                  {additionalImages.map((image) => (
                    <div
                      key={image.id}
                      style={{
                        position: 'relative',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.2s',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <img
                        src={image.preview}
                        alt="미리보기"
                        style={{
                          width: '100%',
                          height: '140px',
                          objectFit: 'cover',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          background: '#dc2626',
                          color: 'white',
                          borderRadius: '50%',
                          padding: '8px',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                          transition: 'transform 0.2s',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'scale(1.1)';
                          e.currentTarget.style.background = '#b91c1c';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.background = '#dc2626';
                        }}
                      >
                        <svg
                          style={{ width: '14px', height: '14px' }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notes */}
            <Input
              label="💬 추가 메모 (선택사항)"
              placeholder="기타 관련 정보를 입력하세요..."
              value={notes}
              onChange={setNotes}
              type="textarea"
            />

            {/* Actions */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '16px',
                paddingTop: '8px',
              }}
            >
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  style={{
                    padding: '14px 24px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    border: '2px solid #d1d5db',
                    background: 'white',
                    color: '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#f3f4f6';
                    e.currentTarget.style.borderColor = '#9ca3af';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }}
                >
                  ← 뒤로 가기
                </button>
              )}
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  border: 'none',
                  background: '#2563eb',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#1d4ed8';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#2563eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
                }}
              >
                분석 계속하기 →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
