import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input, Button } from '@/components/common';
import { authApi } from '@/api/authApi';

export const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // 이메일 검증
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요';
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다';
    }

    // 이름 검증
    if (!formData.name) {
      newErrors.name = '이름을 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      console.log("회원가입 폼 제출:", formData);
      await authApi.signup(formData);
      alert('회원가입이 완료되었습니다!');
      navigate('/login');
    } catch (error: any) {
      console.error("회원가입 에러:", error);
      console.error("에러 응답:", error.response);

      if (error.response?.status === 409) {
        setErrors({ email: '이미 가입된 이메일입니다' });
      } else if (error.message && error.message.includes('Network Error')) {
        alert('서버 연결에 실패했습니다. CORS 설정을 확인해주세요.');
      } else {
        const errorMsg = error.response?.data?.detail || error.response?.data?.message || '회원가입에 실패했습니다. 다시 시도해주세요.';
        alert(errorMsg);
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
            marginBottom: '32px',
            textAlign: 'center',
            color: '#111827',
          }}
        >
          회원가입
        </h1>

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
            error={errors.email}
            required
          />

          <Input
            label="비밀번호"
            type="password"
            value={formData.password}
            onChange={(value) => setFormData({ ...formData, password: value })}
            placeholder="최소 8자 이상"
            error={errors.password}
            required
          />

          <Input
            label="이름"
            type="text"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="홍길동"
            error={errors.name}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isLoading}
            disabled={isLoading}
          >
            가입하기
          </Button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            이미 계정이 있으신가요?{' '}
            <Link to="/login" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
