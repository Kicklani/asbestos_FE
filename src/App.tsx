import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { HomePage, AnalysisPage, AboutPage } from '@/pages';
import { LoginPage } from '@/pages/auth/LoginPage';
import { SignupPage } from '@/pages/auth/SignupPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인증 페이지 (레이아웃 없음) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 메인 페이지들 (레이아웃 포함) */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
