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
      newErrors.location = 'Location is required';
    }

    if (!width || parseFloat(width) <= 0) {
      newErrors.width = 'Valid width is required';
    }

    if (!height || parseFloat(height) <= 0) {
      newErrors.height = 'Valid height is required';
    }

    if (!depth || parseFloat(depth) <= 0) {
      newErrors.depth = 'Valid depth is required';
    }

    if (additionalImages.length === 0) {
      newErrors.images = 'Please upload at least one additional image';
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
    <Card title="Additional Information" subtitle="Help us analyze more accurately">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location */}
        <Input
          label="Location"
          placeholder="Where was this material found?"
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
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Size Measurements <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
            <Input
              label="Width"
              placeholder="0"
              type="number"
              value={width}
              onChange={setWidth}
              error={errors.width}
              required
            />
            <Input
              label="Height"
              placeholder="0"
              type="number"
              value={height}
              onChange={setHeight}
              error={errors.height}
              required
            />
            <Input
              label="Depth"
              placeholder="0"
              type="number"
              value={depth}
              onChange={setDepth}
              error={errors.depth}
              required
            />
          </div>

          {/* Unit Selection */}
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="unit"
                value="cm"
                checked={unit === 'cm'}
                onChange={() => setUnit('cm')}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">Centimeters (cm)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="unit"
                value="mm"
                checked={unit === 'mm'}
                onChange={() => setUnit('mm')}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">Millimeters (mm)</span>
            </label>
          </div>
        </div>

        {/* Additional Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Additional Images <span className="text-red-500">*</span>
          </label>
          <ImageUploader onImagesSelected={handleImagesSelected} maxFiles={5} />
          {errors.images && (
            <p className="text-sm text-red-600 mt-2">{errors.images}</p>
          )}

          {/* Image Previews */}
          {additionalImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {additionalImages.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.preview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          label="Additional Notes"
          placeholder="Any other relevant information..."
          value={notes}
          onChange={setNotes}
          type="textarea"
        />

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          {onBack && (
            <Button type="button" onClick={onBack} variant="outline">
              Back
            </Button>
          )}
          <Button type="submit" variant="primary" className="flex-1">
            Continue to Analysis
          </Button>
        </div>
      </form>
    </Card>
  );
};
