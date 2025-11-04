import React, { useState } from 'react';
import {
  ImageUploader,
  AnalysisResult as AnalysisResultComponent,
  AdditionalInfoForm,
  InspectionCenterList,
} from '@/components/analysis';
import { Card, LoadingSpinner, Button } from '@/components/common';
import { ImageUpload, AnalysisResult, AdditionalInfo, InspectionCenter } from '@/types';

type Step = 'upload' | 'result' | 'additional-info' | 'inspection-centers';

export const AnalysisPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [uploadedImages, setUploadedImages] = useState<ImageUpload[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [inspectionCenters, setInspectionCenters] = useState<InspectionCenter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle image upload
  const handleImagesSelected = async (files: File[]) => {
    const newImages: ImageUpload[] = files.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString(),
    }));

    setUploadedImages(newImages);
  };

  // Handle analysis submission
  const handleAnalyze = async () => {
    if (uploadedImages.length === 0) {
      setError('Please upload at least one image');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock result - replace with actual API response
      const mockResult: AnalysisResult = {
        id: `analysis-${Date.now()}`,
        status: Math.random() > 0.7 ? 'safe' : Math.random() > 0.5 ? 'uncertain' : 'danger',
        confidence: Math.floor(Math.random() * 30) + 70,
        message: 'Based on the visual analysis of the provided image, our AI model has completed the preliminary screening.',
        detectedFeatures: [
          'Fibrous texture detected',
          'Color patterns analyzed',
          'Surface characteristics evaluated',
        ],
        recommendations: [
          'Review the detailed analysis report',
          'Consider professional inspection if concerned',
          'Keep records of this screening',
        ],
        timestamp: new Date().toISOString(),
      };

      setAnalysisResult(mockResult);
      setCurrentStep('result');
    } catch (err) {
      setError('Analysis failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle continue from result
  const handleContinueFromResult = () => {
    if (analysisResult?.status === 'uncertain') {
      setCurrentStep('additional-info');
    } else if (analysisResult?.status === 'danger') {
      handleFetchInspectionCenters();
    }
  };

  // Handle additional info submission
  const handleAdditionalInfoSubmit = async (_info: AdditionalInfo) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // You can use `info` parameter when implementing the real API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock updated result
      const updatedResult: AnalysisResult = {
        ...analysisResult!,
        status: Math.random() > 0.5 ? 'safe' : 'danger',
        confidence: Math.floor(Math.random() * 20) + 80,
        message: 'With the additional information provided, we have completed a more detailed analysis.',
        timestamp: new Date().toISOString(),
      };

      setAnalysisResult(updatedResult);

      if (updatedResult.status === 'danger') {
        handleFetchInspectionCenters();
      } else {
        setCurrentStep('result');
      }
    } catch (err) {
      setError('Failed to process additional information. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch inspection centers
  const handleFetchInspectionCenters = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock inspection centers
      const mockCenters: InspectionCenter[] = [
        {
          id: '1',
          name: 'Seoul Asbestos Testing Center',
          address: '123 Gangnam-daero, Gangnam-gu, Seoul',
          distance: 2.3,
          estimatedCost: { min: 150000, max: 300000 },
          inspectionTime: '3-5 business days',
          rating: 5,
          phone: '02-1234-5678',
          certified: true,
          coordinates: { lat: 37.4979, lng: 127.0276 },
        },
        {
          id: '2',
          name: 'Korea Environmental Analysis Lab',
          address: '456 Teheran-ro, Gangnam-gu, Seoul',
          distance: 3.7,
          estimatedCost: { min: 120000, max: 250000 },
          inspectionTime: '2-4 business days',
          rating: 4,
          phone: '02-2345-6789',
          certified: true,
          coordinates: { lat: 37.5048, lng: 127.0495 },
        },
        {
          id: '3',
          name: 'National Asbestos Inspection Service',
          address: '789 Yangjae-daero, Seocho-gu, Seoul',
          distance: 5.2,
          estimatedCost: { min: 100000, max: 200000 },
          inspectionTime: '5-7 business days',
          rating: 5,
          phone: '02-3456-7890',
          certified: true,
          coordinates: { lat: 37.4833, lng: 127.0322 },
        },
      ];

      setInspectionCenters(mockCenters);
      setCurrentStep('inspection-centers');
    } catch (err) {
      setError('Failed to fetch inspection centers. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset analysis
  const handleReset = () => {
    // Clean up image previews
    uploadedImages.forEach((img) => URL.revokeObjectURL(img.preview));

    setCurrentStep('upload');
    setUploadedImages([]);
    setAnalysisResult(null);
    setInspectionCenters([]);
    setError(null);
  };

  // Render progress steps
  const renderProgressSteps = () => {
    const steps = [
      { id: 'upload', label: 'Upload', number: 1 },
      { id: 'result', label: 'Results', number: 2 },
      { id: 'inspection-centers', label: 'Centers', number: 3 },
    ];

    const getCurrentStepNumber = () => {
      switch (currentStep) {
        case 'upload': return 1;
        case 'result': return 2;
        case 'additional-info': return 2;
        case 'inspection-centers': return 3;
        default: return 1;
      }
    };

    const currentNumber = getCurrentStepNumber();

    return (
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  step.number <= currentNumber
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.number}
              </div>
              <span className={`text-xs mt-1 ${step.number <= currentNumber ? 'text-blue-600' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-1 rounded transition-colors ${
                  step.number < currentNumber ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Asbestos Analysis
            </h1>
            <p className="text-gray-600">
              Upload images for AI-powered preliminary screening
            </p>
          </div>

          {/* Progress Steps */}
          {renderProgressSteps()}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <Card className="mb-6">
              <LoadingSpinner size="lg" message="Analyzing your image..." />
            </Card>
          )}

          {/* Step Content */}
          {!isLoading && (
            <>
              {/* Upload Step */}
              {currentStep === 'upload' && (
                <div className="space-y-6">
                  <ImageUploader onImagesSelected={handleImagesSelected} maxFiles={1} />

                  {/* Image Preview */}
                  {uploadedImages.length > 0 && (
                    <Card title="Uploaded Image">
                      <div className="grid grid-cols-1 gap-4">
                        {uploadedImages.map((image) => (
                          <div key={image.id} className="relative">
                            <img
                              src={image.preview}
                              alt="Uploaded"
                              className="w-full h-64 object-contain bg-gray-100 rounded-lg"
                            />
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => setUploadedImages([])}
                              className="absolute top-2 right-2"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6">
                        <Button
                          onClick={handleAnalyze}
                          variant="primary"
                          size="lg"
                          className="w-full"
                        >
                          Analyze Image
                        </Button>
                      </div>
                    </Card>
                  )}
                </div>
              )}

              {/* Result Step */}
              {currentStep === 'result' && analysisResult && (
                <AnalysisResultComponent
                  result={analysisResult}
                  onContinue={handleContinueFromResult}
                  onReset={handleReset}
                />
              )}

              {/* Additional Info Step */}
              {currentStep === 'additional-info' && (
                <AdditionalInfoForm
                  onSubmit={handleAdditionalInfoSubmit}
                  onBack={() => setCurrentStep('result')}
                />
              )}

              {/* Inspection Centers Step */}
              {currentStep === 'inspection-centers' && (
                <div>
                  <InspectionCenterList centers={inspectionCenters} />
                  <div className="mt-6 text-center">
                    <Button onClick={handleReset} variant="outline">
                      Start New Analysis
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
