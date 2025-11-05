import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full px-6 py-32">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            AI 기반 석면 검출
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            첨단 AI 기술을 활용한 석면 재료의 빠르고 정확한 예비 스크리닝
          </p>
          <Link to="/analysis">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg font-semibold rounded-lg">
              분석 시작하기
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full px-6 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-12 text-center">
          <div>
            <p className="text-5xl font-bold text-blue-600 mb-2">95%</p>
            <p className="text-gray-600">정확도</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-blue-600 mb-2">&lt;30초</p>
            <p className="text-gray-600">분석 시간</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-blue-600 mb-2">24/7</p>
            <p className="text-gray-600">언제나 이용</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            사용 방법
          </h2>
          <div className="grid grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. 이미지 업로드</h3>
              <p className="text-gray-600">재료 사진을 촬영하여 업로드하세요</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. AI 분석</h3>
              <p className="text-gray-600">AI가 즉시 이미지를 분석합니다</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. 결과 확인</h3>
              <p className="text-gray-600">분석 결과를 확인하세요</p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="w-full px-6 py-12 bg-yellow-50 border-t-2 border-b-2 border-yellow-200">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold text-yellow-900 mb-2">중요 안내사항</p>
              <p className="text-gray-700">
                본 애플리케이션은 예비 스크리닝 목적으로만 제공되며 전문가의 분석을 대체할 수 없습니다.
                석면 관련 최종 확인은 반드시 인증된 전문가와 상담하시기 바랍니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
