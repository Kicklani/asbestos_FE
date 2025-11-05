import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common';

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
    <div className="bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="w-full px-6 lg:px-16 xl:px-24 py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-blue-100 rounded-full animate-pulse">
            <span className="text-blue-700 font-bold text-sm">🚀 AI 기반 석면 검출 서비스</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI 기반 석면 검출
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            첨단 AI 기술을 활용한 석면 재료의 빠르고 정확한 예비 스크리닝
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/analysis" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-2xl shadow-blue-300 px-10 py-5 text-xl font-bold rounded-2xl transform hover:scale-105 transition-all">
                분석 시작하기 →
              </Button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full border-3 border-blue-600 text-blue-600 hover:bg-blue-50 px-10 py-5 text-xl font-bold rounded-2xl transform hover:scale-105 transition-all">
                자세히 알아보기
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-[1200px] mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-300 transform hover:-translate-y-2">
              <p className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">95%</p>
              <p className="text-lg font-semibold text-gray-700">정확도</p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-300 transform hover:-translate-y-2">
              <p className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">&lt;30초</p>
              <p className="text-lg font-semibold text-gray-700">분석 시간</p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-300 transform hover:-translate-y-2">
              <p className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">24/7</p>
              <p className="text-lg font-semibold text-gray-700">언제나 이용</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20 md:py-32">
        <div className="w-full px-6 lg:px-16 xl:px-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                사용 방법
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                간단한 3단계로 결과를 받아보세요
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 z-0"></div>

              {steps.map((step) => (
                <div key={step.number} className="relative z-10">
                  <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-300 transform hover:-translate-y-3">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <span className="text-5xl">{step.icon}</span>
                    </div>
                    <div className="mb-4">
                      <span className="inline-block w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full font-bold text-xl flex items-center justify-center shadow-lg">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-base">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-gray-50 to-blue-50 py-20 md:py-32">
        <div className="w-full px-6 lg:px-16 xl:px-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                왜 저희 서비스를 선택해야 할까요?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                첨단 기술과 사용자 친화적인 디자인의 만남
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="group">
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-300 transform hover:-translate-y-2 h-full">
                    <div className="text-center">
                      <div className="inline-block w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                        <span className="text-4xl">{feature.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-24 md:py-36">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="w-full px-6 lg:px-16 xl:px-24 relative z-10">
          <div className="max-w-[1000px] mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              지금 바로 시작하세요
            </h2>
            <p className="text-2xl text-blue-100 mb-12 leading-relaxed">
              무료로 분석을 시작하고 몇 초 만에 결과를 받아보세요
            </p>
            <Link to="/analysis">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl px-12 py-6 text-2xl font-bold rounded-2xl transform hover:scale-110 transition-all duration-300"
              >
                무료 분석 시작하기 🚀
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="bg-yellow-50 border-t-4 border-b-4 border-yellow-300 py-12">
        <div className="w-full px-6 lg:px-16 xl:px-24">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-yellow-200">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-900 mb-4">⚠️ 중요 안내사항</p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    본 애플리케이션은 예비 스크리닝 목적으로만 제공되며 전문가의 분석을 대체할 수 없습니다.
                    석면 관련 최종 확인 및 안전 결정은 <strong className="text-yellow-900">반드시 인증된 전문가와 상담</strong>하시기 바랍니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
