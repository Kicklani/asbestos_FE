import React, { useState } from 'react';
import { useAnalysisStore } from '@store/analysisStore';
import { analysisApi } from '@api/analysisApi';
import { Button, Card, LoadingSpinner } from '@components/common';
import {
  ImageUploader,
  AnalysisResult,
  AdditionalInfoForm,
  InspectionCenterList,
} from '@components/analysis';

export const AnalysisPage: React.FC = () => {
  const {
    currentStep,
    images,
    analysisResult,
    additionalInfo,
    inspectionCenters,
    isLoading,
    error,
    setCurrentStep,
    setAnalysisResult,
    setInspectionCenters,
    setLoading,
    setError,
  } = useAnalysisStore();

  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const handleBasicAnalysis = async () => {
    if (images.length === 0) {
      setError('Please upload at least one image');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await analysisApi.analyzeImage(images[0].file);

      if (response.success && response.data) {
        setAnalysisResult(response.data);
        setCurrentStep(2);

        // If yellow or red, show additional info form
        if (response.data.status === 'yellow' || response.data.status === 'red') {
          setShowAdditionalInfo(true);
        }
      } else {
        setError(response.error || 'Analysis failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image');
    } finally {
      setLoading(false);
    }
  };

  const handleDetailedAnalysis = async () => {
    setLoading(true);
    setError(null);

    try {
      const imageFiles = images.map((img) => img.file);
      const response = await analysisApi.analyzeDetailed(
        imageFiles,
        additionalInfo.location,
        additionalInfo.size,
        additionalInfo.notes
      );

      if (response.success && response.data) {
        setAnalysisResult(response.data);

        // If still uncertain, fetch inspection centers
        if (response.data.status === 'yellow' || response.data.status === 'red') {
          const centersResponse = await analysisApi.getInspectionCenters();
          if (centersResponse.success) {
            setInspectionCenters(centersResponse.data);
            setCurrentStep(3);
          }
        }
      } else {
        setError(response.error || 'Detailed analysis failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to perform detailed analysis');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Asbestos Analysis</h1>
        <p className="text-gray-600">
          Step {currentStep} of 3 - {currentStep === 1 ? 'Upload Image' : currentStep === 2 ? 'Analysis Results' : 'Inspection Centers'}
        </p>
      </div>

      {/* Step progress indicator */}
      <div className="flex justify-center gap-4">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
              currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            {step}
          </div>
        ))}
      </div>

      {error && (
        <Card className="bg-red-50 border-red-200">
          <p className="text-red-600">{error}</p>
        </Card>
      )}

      {/* Step 1: Image Upload */}
      {currentStep === 1 && (
        <Card title="Upload Stone Image">
          <div className="space-y-6">
            <ImageUploader maxImages={1} />
            <Button
              onClick={handleBasicAnalysis}
              disabled={images.length === 0 || isLoading}
              variant="primary"
              className="w-full"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Image'}
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Analysis Results */}
      {currentStep === 2 && (
        <div className="space-y-6">
          {isLoading ? (
            <Card>
              <LoadingSpinner size="large" message="Analyzing your image..." />
            </Card>
          ) : (
            <>
              {analysisResult && <AnalysisResult result={analysisResult} />}

              {showAdditionalInfo && analysisResult?.status !== 'green' && (
                <div className="space-y-6">
                  <AdditionalInfoForm />
                  <Button onClick={handleDetailedAnalysis} variant="primary" className="w-full">
                    Submit for Detailed Analysis
                  </Button>
                </div>
              )}

              {analysisResult?.status === 'green' && (
                <Button onClick={handleReset} variant="secondary" className="w-full">
                  Analyze Another Stone
                </Button>
              )}
            </>
          )}
        </div>
      )}

      {/* Step 3: Inspection Centers */}
      {currentStep === 3 && (
        <div className="space-y-6">
          {inspectionCenters.length > 0 && (
            <InspectionCenterList centers={inspectionCenters} />
          )}
          <Button onClick={handleReset} variant="secondary" className="w-full">
            Start New Analysis
          </Button>
        </div>
      )}
    </div>
  );
};
