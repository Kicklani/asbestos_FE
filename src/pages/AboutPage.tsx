import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '@/components/common';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-gray-50 min-h-screen py-12 md:py-20">
      <div className="w-full px-6 lg:px-16 xl:px-24">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                석면 검출 서비스 소개
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              AI 기반 예비 스크리닝으로 안전한 환경을 만듭니다
            </p>
          </div>

          {/* Mission */}
          <Card className="mb-10 bg-white rounded-3xl shadow-2xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">우리의 미션</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-5">
              석면 노출은 전 세계적으로 심각한 건강 문제로 남아있습니다. 우리의 미션은 인공지능의 힘을 통해
              모든 사람이 빠르고 저렴하게 예비 석면 스크리닝을 이용할 수 있도록 만드는 것입니다.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              조기 발견과 인식이 석면 관련 건강 문제를 예방하는 핵심이라고 믿습니다. 즉각적인 예비 결과를 제공함으로써
              개인과 조직이 잠재적인 석면 위험에 대해 정보에 입각한 결정을 내릴 수 있도록 지원합니다.
            </p>
          </Card>

          {/* Technology */}
          <Card className="mb-10 bg-white rounded-3xl shadow-2xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">우리의 기술</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🤖</span>
                  첨단 머신러닝
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  우리의 AI 모델은 수천 개의 석면 함유 재료와 안전한 재료 이미지로 학습되었습니다.
                  딥러닝 기술을 사용하여 석면과 관련된 시각적 패턴과 특성을 식별합니다.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  3단계 분류 시스템
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border-2 border-green-200">
                    <span className="text-2xl">✅</span>
                    <span className="text-lg"><strong className="text-green-700">안전 (녹색):</strong> 시각적 분석 결과 석면이 없는 것으로 보이는 재료</span>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                    <span className="text-2xl">⚠️</span>
                    <span className="text-lg"><strong className="text-yellow-700">불확실 (노란색):</strong> 정확한 판정을 위해 추가 정보가 필요한 경우</span>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border-2 border-red-200">
                    <span className="text-2xl">🚨</span>
                    <span className="text-lg"><strong className="text-red-700">위험 (빨간색):</strong> 석면과 일반적으로 관련된 특성을 보이는 재료</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  최신 기술 스택
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  최적의 성능과 사용자 경험을 위한 최첨단 기술로 구축되었습니다:
                </p>
                <div className="flex flex-wrap gap-3">
                  {['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'React Router'].map((tech) => (
                    <span key={tech} className="px-5 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-base font-bold shadow-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* How to Use */}
          <Card className="mb-10 bg-white rounded-3xl shadow-2xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">사용 방법</h2>
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full font-bold text-xl flex items-center justify-center shadow-lg">1</span>
                  <h3 className="text-xl font-bold text-gray-900">이미지 업로드</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed ml-[4.5rem]">
                  분석하려는 재료의 선명한 사진을 촬영하세요. 이미지가 잘 조명되어 있고
                  재료의 질감과 색상이 명확하게 보이는지 확인하세요.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full font-bold text-xl flex items-center justify-center shadow-lg">2</span>
                  <h3 className="text-xl font-bold text-gray-900">즉시 결과 확인</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed ml-[4.5rem]">
                  AI가 몇 초 만에 이미지를 분석하고 신뢰도 수준과 함께 예비 평가를 제공합니다.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full font-bold text-xl flex items-center justify-center shadow-lg">3</span>
                  <h3 className="text-xl font-bold text-gray-900">권장 사항 따르기</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed ml-[4.5rem]">
                  결과에 따라 다음 단계를 안내해 드립니다. 불확실하거나 위험한 결과의 경우,
                  근처의 인증된 검사소를 찾는 것을 도와드립니다.
                </p>
              </div>
            </div>
          </Card>

          {/* Limitations & Disclaimer */}
          <Card className="mb-10 border-4 border-yellow-300 bg-yellow-50 rounded-3xl shadow-2xl">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-yellow-900 mb-4">⚠️ 중요 안내사항</h2>
                <div className="space-y-3 text-yellow-900">
                  <p className="font-bold text-lg">본 서비스는 예비 스크리닝 도구에 불과합니다.</p>
                  <ul className="space-y-2 ml-2 text-base">
                    <li className="flex gap-3">
                      <span className="text-yellow-600 font-bold">•</span>
                      <span>결과는 전문 실험실 분석을 대체할 수 없습니다</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-yellow-600 font-bold">•</span>
                      <span>시각적 검사만으로는 석면을 확실하게 식별할 수 없습니다</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-yellow-600 font-bold">•</span>
                      <span>최종 확인은 항상 인증된 전문가와 상담하시기 바랍니다</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-yellow-600 font-bold">•</span>
                      <span>적절한 교육 없이 석면 의심 재료를 다루지 마십시오</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-yellow-600 font-bold">•</span>
                      <span>본 분석 결과에 근거한 결정에 대해 책임지지 않습니다</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="relative overflow-hidden text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 md:p-16 text-white shadow-2xl">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">지금 바로 시작하세요!</h2>
              <p className="text-xl text-blue-100 mb-8">
                무료로 예비 분석을 시작해보세요
              </p>
              <Link to="/analysis">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl px-10 py-5 text-xl font-bold rounded-2xl transform hover:scale-110 transition-all duration-300">
                  분석 시작하기 🚀
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
