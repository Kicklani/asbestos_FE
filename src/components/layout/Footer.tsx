import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🔬</span>
              </div>
              <h3 className="text-white font-bold text-xl">석면 검출기</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              AI 기반 석면 검출 예비 스크리닝 서비스.
              빠르고 쉽게, 누구나 접근 가능합니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">바로가기</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="text-blue-500 group-hover:translate-x-1 transition-transform">→</span>
                  홈
                </Link>
              </li>
              <li>
                <Link to="/analysis" className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="text-blue-500 group-hover:translate-x-1 transition-transform">→</span>
                  분석 시작하기
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="text-blue-500 group-hover:translate-x-1 transition-transform">→</span>
                  서비스 소개
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">법적 고지</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-gray-300 cursor-pointer transition-colors">개인정보 처리방침</li>
              <li className="hover:text-gray-300 cursor-pointer transition-colors">이용약관</li>
              <li className="hover:text-gray-300 cursor-pointer transition-colors">고객 지원</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 pt-8 border-t border-gray-700">
          <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-2 border-yellow-700/50 rounded-xl p-5 mb-6 backdrop-blur-sm">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="text-sm">
                <p className="text-yellow-200 font-bold mb-2 text-base">⚠️ 중요 안내사항</p>
                <p className="text-yellow-100 leading-relaxed">
                  본 애플리케이션은 예비 스크리닝 목적으로만 제공되며 전문가의 분석을 대체할 수 없습니다.
                  석면 관련 최종 확인 및 안전 결정은 반드시 인증된 전문가와 상담하시기 바랍니다.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              &copy; {currentYear} 석면 검출기. All rights reserved.
            </p>
            <p className="text-xs text-gray-600">
              Made with ❤️ for safer environments
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
