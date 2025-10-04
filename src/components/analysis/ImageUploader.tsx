import React, { useCallback } from 'react';
import { useAnalysisStore } from '@store/analysisStore';
import { generateImagePreview, validateImageFile } from '@utils/imageUtils';
import { ImageUpload } from '@types/index';

interface ImageUploaderProps {
  multiple?: boolean;
  maxImages?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  multiple = false,
  maxImages = 1,
}) => {
  const { images, addImage, removeImage, setError } = useAnalysisStore();

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);

      if (images.length + files.length > maxImages) {
        setError(`Maximum ${maxImages} images allowed`);
        return;
      }

      for (const file of files) {
        try {
          validateImageFile(file);
          const preview = await generateImagePreview(file);

          const imageUpload: ImageUpload = {
            id: `${Date.now()}-${Math.random()}`,
            file,
            preview,
            uploadedAt: new Date().toISOString(),
          };

          addImage(imageUpload);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Failed to upload image');
        }
      }

      e.target.value = '';
    },
    [images.length, maxImages, addImage, setError]
  );

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
          disabled={images.length >= maxImages}
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <div className="text-gray-600">
            <p className="text-lg font-medium">Click to upload image</p>
            <p className="text-sm mt-2">PNG, JPG, WebP up to 10MB</p>
            {multiple && <p className="text-sm">You can upload up to {maxImages} images</p>}
          </div>
        </label>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.preview}
                alt="Uploaded"
                className="w-full h-40 object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(image.id)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
