import React from 'react';
import { Card } from '@/components/common';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white w-full flex flex-col items-center py-16">
      <div className="w-full max-w-[1400px] px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            석면 검출 서비스
          </h1>
          <p className="text-lg text-gray-600">
            AI 기반 예비 스크리닝으로 안전한 환경을 만듭니다
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">우리의 미션</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            석면 노출은 전 세계적으로 심각한 건강 문제로 남아있습니다. 우리의 미션은 인공지능의 힘을 통해
            모든 사람이 빠르고 저렴하게 예비 석면 스크리닝을 이용할 수 있도록 만드는 것입니다.
          </p>
          <p className="text-gray-700 leading-relaxed">
            조기 발견과 인식이 석면 관련 건강 문제를 예방하는 핵심이라고 믿습니다.
          </p>
        </Card>

        {/* How It Works */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">사용 방법</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="text-2xl">1.</span>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">이미지 업로드</h3>
                <p className="text-gray-700">분석하려는 재료의 선명한 사진을 촬영하세요.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">2.</span>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">AI 분석</h3>
                <p className="text-gray-700">AI가 몇 초 만에 이미지를 분석합니다.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">3.</span>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">결과 확인</h3>
                <p className="text-gray-700">신뢰도 수준과 함께 예비 평가를 제공합니다.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold text-yellow-900 mb-2">중요 안내사항</p>
              <p className="text-sm text-gray-700 mb-2">본 서비스는 예비 스크리닝 도구입니다.</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• 결과는 전문 실험실 분석을 대체할 수 없습니다</li>
                <li>• 최종 확인은 항상 인증된 전문가와 상담하시기 바랍니다</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
