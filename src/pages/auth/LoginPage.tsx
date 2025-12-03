import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input, Button } from '@/components/common';
import { authApi } from '@/api/authApi';
import { useAuthStore } from '@/store/authStore';

export const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setTokens, setUser } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('이메일과 비밀번호를 입력해주세요');
      return;
    }

    setIsLoading(true);
    try {
      const response = await authApi.login(formData);

      // 토큰 저장
      setTokens(response.access_token, response.refresh_token);

      // 사용자 정보 저장
      const userInfo = await authApi.getCurrentUser();
      setUser(userInfo);

      // 메인 페이지로 이동
      navigate('/');
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다');
      } else {
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #ffffff 0%, #f0f7ff 50%, #ffffff 100%)',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '48px',
          borderRadius: '20px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '480px',
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            fontWeight: '900',
            marginBottom: '8px',
            textAlign: 'center',
            color: '#111827',
          }}
        >
          로그인
        </h1>
        <p
          style={{
            color: '#6b7280',
            fontSize: '14px',
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          석면 검출 서비스에 오신 것을 환영합니다
        </p>

        {error && (
          <div
            style={{
              background: '#fee2e2',
              border: '1px solid #fecaca',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              color: '#991b1b',
              fontSize: '14px',
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <Input
            label="이메일"
            type="email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            placeholder="example@email.com"
            required
          />

          <Input
            label="비밀번호"
            type="password"
            value={formData.password}
            onChange={(value) => setFormData({ ...formData, password: value })}
            placeholder="비밀번호를 입력하세요"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isLoading}
            disabled={isLoading}
          >
            로그인
          </Button>
        </form>

        {/* 로그인 없이 이용하기 */}
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              border: '1px solid #d1d5db',
              background: 'white',
              color: '#374151',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'white';
            }}
          >
            로그인 없이 이용하기
          </button>
        </div>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            계정이 없으신가요?{' '}
            <Link to="/signup" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
