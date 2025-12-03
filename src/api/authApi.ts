import client from './client';

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export const authApi = {
  // 회원가입
  signup: async (data: SignupRequest) => {
    const response = await client.post('/api/auth/signup', data);
    return response.data;
  },

  // 로그인
  login: async (data: LoginRequest): Promise<TokenResponse> => {
    const response = await client.post('/api/auth/login', data);
    return response.data;
  },

  // 토큰 갱신
  refreshToken: async (refreshToken: string): Promise<TokenResponse> => {
    const response = await client.post('/api/auth/token', {
      refresh_token: refreshToken,
    });
    return response.data;
  },

  // 현재 사용자 정보 조회
  getCurrentUser: async () => {
    const response = await client.get('/api/auth/me');
    return response.data;
  },

  // 이메일 인증 코드 발송
  sendEmailVerification: async (email: string) => {
    const response = await client.post('/api/auth/email/send', { email });
    return response.data;
  },

  // 이메일 인증 코드 검증
  verifyEmail: async (email: string, code: string) => {
    const response = await client.post('/api/auth/email/verify', {
      email,
      code,
    });
    return response.data;
  },
};
