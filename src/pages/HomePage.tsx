import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from '@/components/common';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: '🔬',
      title: 'AI 기반 분석',
      description: '정확한 석면 검출을 위한 첨단 머신러닝 알고리즘',
    },
    {
      icon: '⚡',
      title: '빠른 결과',
      description: '며칠이 아닌 몇 초 만에 예비 결과 제공',
    },
    {
      icon: '📱',
      title: '사용하기 쉬운',
      description: '간단한 3단계 프로세스 - 업로드, 분석, 결과 확인',
    },
    {
      icon: '🎯',
      title: '높은 정확도',
      description: '신뢰할 수 있는 스크리닝을 위한 3단계 분류 시스템',
    },
    {
      icon: '🗺️',
      title: '검사소 찾기',
      description: '인증된 검사 시설 추천 서비스 제공',
    },
    {
      icon: '🔒',
      title: '안전하고 비공개',
      description: '데이터는 암호화되며 절대 공유되지 않습니다',
    },
  ];

  const steps = [
    {
      number: 1,
      title: '이미지 업로드',
      description: '재료 사진을 촬영하여 플랫폼에 업로드하세요',
      icon: '📸',
    },
    {
      number: 2,
      title: 'AI 분석',
      description: 'AI가 이미지를 분석하고 즉시 결과를 제공합니다',
      icon: '🤖',
    },
    {
      number: 3,
      title: '결과 확인',
      description: '상세한 분석 결과와 다음 단계 권장 사항을 받아보세요',
      icon: '📊',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            AI 기반 석면 검출
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            첨단 AI 기술을 활용한 석면 재료의 빠르고 정확한 예비 스크리닝
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/analysis">
              <Button size="lg" className="w-full sm:w-auto">
                분석 시작하기
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                자세히 알아보기
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-600">95%</p>
              <p className="text-sm md:text-base text-gray-600 mt-1">정확도</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-600">&lt;30초</p>
              <p className="text-sm md:text-base text-gray-600 mt-1">분석 시간</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-600">24/7</p>
              <p className="text-sm md:text-base text-gray-600 mt-1">언제나 이용</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              사용 방법
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              간단한 3단계로 결과를 받아보세요
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">{step.icon}</span>
                  </div>
                  <div className="mb-2">
                    <span className="inline-block w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              왜 저희 서비스를 선택해야 할까요?
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              첨단 기술과 사용자 친화적인 디자인의 만남
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} hoverable>
                  <div className="text-center">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              지금 바로 시작하세요
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              무료로 분석을 시작하고 몇 초 만에 결과를 받아보세요
            </p>
            <Link to="/analysis">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                무료 분석 시작하기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="bg-yellow-50 border-t border-b border-yellow-200 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex gap-4">
            <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-yellow-900 mb-1">중요 안내사항</p>
              <p className="text-sm text-yellow-800">
                본 애플리케이션은 예비 스크리닝 목적으로만 제공되며 전문가의 분석을 대체할 수 없습니다.
                석면 관련 최종 확인 및 안전 결정은 반드시 인증된 전문가와 상담하시기 바랍니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
