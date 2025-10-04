import React from 'react';
import { AnalysisResult as AnalysisResultType } from '@types/index';
import { getStatusColor, getStatusEmoji, formatDateTime } from '@utils/formatters';
import { Card } from '@components/common';

interface AnalysisResultProps {
  result: AnalysisResultType;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  const statusColor = getStatusColor(result.status);
  const statusEmoji = getStatusEmoji(result.status);

  const getStatusTitle = () => {
    switch (result.status) {
      case 'green':
        return "Safe - No Asbestos Detected";
      case 'yellow':
        return "Uncertain - Further Analysis Needed";
      case 'red':
        return "Warning - Potential Asbestos Detected";
    }
  };

  const getProbability = () => {
    switch (result.status) {
      case 'green':
        return '70%';
      case 'yellow':
        return '25%';
      case 'red':
        return '5%';
    }
  };

  return (
    <Card className="border-l-4" style={{ borderLeftColor: statusColor }}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{statusEmoji}</span>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: statusColor }}>
              {getStatusTitle()}
            </h2>
            <p className="text-sm text-gray-500">
              Confidence: {result.confidence}% | Probability: {getProbability()}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-800 font-medium">{result.message}</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Recommendation:</h4>
          <p className="text-blue-800">{result.recommendation}</p>
        </div>

        <p className="text-xs text-gray-400">
          Analyzed at: {formatDateTime(result.timestamp)}
        </p>
      </div>
    </Card>
  );
};
