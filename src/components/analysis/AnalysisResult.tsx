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
          icon: '✅',
          title: '안전 - 석면 미검출',
          description: 'AI 분석 결과, 이 재료는 안전한 것으로 보입니다.',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-300',
          textColor: 'text-green-900',
        };
      case 'uncertain':
        return {
          color: 'warning',
          icon: '⚠️',
          title: '불확실 - 추가 분석 권장',
          description: '정확한 검출을 위해 추가 정보가 필요합니다.',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-300',
          textColor: 'text-yellow-900',
        };
      case 'danger':
        return {
          color: 'danger',
          icon: '🚨',
          title: '잠재적 위험 감지',
          description: '재료에 석면이 포함되어 있을 수 있습니다. 전문가 검사가 필요합니다.',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-300',
          textColor: 'text-red-900',
        };
    }
  };

  const config = getStatusConfig(result.status);

  return (
    <Card>
      {/* Status Header */}
      <div className={`${config.bgColor} ${config.borderColor} border rounded-lg p-6 mb-6`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-full ${config.bgColor} border ${config.borderColor} flex items-center justify-center flex-shrink-0`}>
            <span className="text-2xl">{config.icon}</span>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className={`text-xl font-bold ${config.textColor}`}>{config.title}</h3>
              <Badge variant={config.color as any} size="sm">
                신뢰도 {result.confidence}%
              </Badge>
            </div>
            <p className={`${config.textColor}`}>{config.description}</p>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
          📋 분석 메시지
        </h4>
        <p className="text-gray-900 bg-gray-50 p-4 rounded-lg border border-gray-200">{result.message}</p>
      </div>

      {/* Detected Features */}
      {result.detectedFeatures && result.detectedFeatures.length > 0 && (
        <div className="mb-6">
          <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
            🔍 감지된 특징
          </h4>
          <ul className="space-y-2 bg-blue-50 p-4 rounded-lg border border-blue-200">
            {result.detectedFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <span className="text-blue-600">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations && result.recommendations.length > 0 && (
        <div className="mb-6">
          <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
            💡 권장 사항
          </h4>
          <ul className="space-y-2 bg-green-50 p-4 rounded-lg border border-green-200">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <span className="text-green-600">✓</span>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Timestamp */}
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        🕐 분석 시각: {new Date(result.timestamp).toLocaleString('ko-KR')}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        {(result.status === 'uncertain' || result.status === 'danger') && onContinue && (
          <Button onClick={onContinue} variant="primary" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
            {result.status === 'uncertain' ? '추가 정보 제공하기' : '검사소 찾기'}
          </Button>
        )}
        {onReset && (
          <Button onClick={onReset} variant="outline" className={onContinue ? '' : 'flex-1'}>
            새로운 분석 시작하기
          </Button>
        )}
      </div>
    </Card>
  );
};
