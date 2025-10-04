import React, { useState } from 'react';
import { useAnalysisStore } from '@store/analysisStore';
import { Button, Card } from '@components/common';
import { ImageUploader } from './ImageUploader';

export const AdditionalInfoForm: React.FC = () => {
  const { additionalInfo, setAdditionalInfo } = useAnalysisStore();
  const [location, setLocation] = useState(additionalInfo.location || '');
  const [size, setSize] = useState(additionalInfo.size || '');
  const [notes, setNotes] = useState(additionalInfo.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdditionalInfo({
      location,
      size,
      notes,
    });
  };

  return (
    <Card title="Additional Information">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h4 className="font-semibold mb-4">Upload 2-3 more images from different angles</h4>
          <ImageUploader multiple maxImages={3} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Where did you find this stone?
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Seoul, Gangnam-gu"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How big is the stone?
          </label>
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="e.g., 10cm x 15cm"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Any other details you'd like to share..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Submit Additional Information
        </Button>
      </form>
    </Card>
  );
};
