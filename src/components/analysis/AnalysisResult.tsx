import React from 'react';
import { AnalysisResult as AnalysisResultType } from '@/types';
import { Card, Badge, Button } from '@/components/common';

interface AnalysisResultProps {
  result: AnalysisResultType;
  onContinue?: () => void;
  onReset?: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({
  result,
  onContinue,
  onReset,
}) => {
  const getStatusConfig = (status: AnalysisResultType['status']) => {
    switch (status) {
      case 'safe':
        return {
          color: 'success',
          icon: '✓',
          title: 'Safe - No Asbestos Detected',
          description: 'Based on AI analysis, this material appears to be safe.',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-900',
        };
      case 'uncertain':
        return {
          color: 'warning',
          icon: '!',
          title: 'Uncertain - Further Analysis Recommended',
          description: 'Additional information needed for accurate detection.',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-900',
        };
      case 'danger':
        return {
          color: 'danger',
          icon: '⚠',
          title: 'Potential Danger Detected',
          description: 'Material may contain asbestos. Professional inspection required.',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-900',
        };
    }
  };

  const config = getStatusConfig(result.status);

  return (
    <Card className="max-w-2xl mx-auto">
      {/* Status Header */}
      <div className={`${config.bgColor} ${config.borderColor} border-2 rounded-lg p-6 mb-6`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-full ${config.bgColor} border-2 ${config.borderColor} flex items-center justify-center flex-shrink-0`}>
            <span className="text-2xl">{config.icon}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className={`text-xl font-bold ${config.textColor}`}>{config.title}</h3>
              <Badge variant={config.color as any} size="sm">
                {result.confidence}% confidence
              </Badge>
            </div>
            <p className={`${config.textColor} opacity-90`}>{config.description}</p>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Analysis Message</h4>
        <p className="text-gray-900">{result.message}</p>
      </div>

      {/* Detected Features */}
      {result.detectedFeatures && result.detectedFeatures.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Detected Features</h4>
          <ul className="space-y-1">
            {result.detectedFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <span className="text-blue-600 mt-1">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations && result.recommendations.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Recommendations</h4>
          <ul className="space-y-2">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <span className="text-green-600 mt-1">✓</span>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Timestamp */}
      <div className="text-xs text-gray-500 mb-6">
        Analyzed at: {new Date(result.timestamp).toLocaleString()}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {(result.status === 'uncertain' || result.status === 'danger') && onContinue && (
          <Button onClick={onContinue} variant="primary" className="flex-1">
            {result.status === 'uncertain' ? 'Provide More Info' : 'Find Inspection Centers'}
          </Button>
        )}
        {onReset && (
          <Button onClick={onReset} variant="outline" className={onContinue ? '' : 'flex-1'}>
            Start New Analysis
          </Button>
        )}
      </div>
    </Card>
  );
};
