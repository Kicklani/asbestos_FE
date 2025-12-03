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
    console.log("=== 회원가입 요청 ===");
    console.log("Base URL:", import.meta.env.VITE_API_BASE_URL);
    console.log("요청 URL:", '/api/auth/signup');
    console.log("전체 URL:", `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`);
    console.log("요청 데이터:", data);
    try {
      const response = await client.post('/api/auth/signup', data);
      console.log("회원가입 성공:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("=== 회원가입 에러 ===");
      console.error("에러 타입:", error.constructor.name);
      console.error("에러 메시지:", error.message);
      console.error("전체 에러:", error);
      console.error("에러 응답:", error.response);
      console.error("에러 요청:", error.request);
      console.error("에러 코드:", error.code);

      // 네트워크 에러인지 확인
      if (!error.response && error.request) {
        console.error("네트워크 에러: 서버로부터 응답이 없습니다");
        console.error("이것은 CORS 문제일 가능성이 높습니다");
      }

      throw error;
    }
  },

  // 로그인
  login: async (data: LoginRequest): Promise<TokenResponse> => {
    console.log("=== 로그인 요청 ===");
    console.log("Base URL:", import.meta.env.VITE_API_BASE_URL);
    console.log("요청 URL:", '/api/auth/login');
    console.log("전체 URL:", `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`);
    console.log("요청 데이터:", { email: data.email, password: '***' });
    try {
      const response = await client.post('/api/auth/login', data);
      console.log("로그인 성공:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("=== 로그인 에러 ===");
      console.error("에러 타입:", error.constructor.name);
      console.error("에러 메시지:", error.message);
      console.error("전체 에러:", error);
      console.error("에러 응답:", error.response);
      console.error("에러 요청:", error.request);
      console.error("에러 코드:", error.code);

      // 네트워크 에러인지 확인
      if (!error.response && error.request) {
        console.error("네트워크 에러: 서버로부터 응답이 없습니다");
        console.error("이것은 CORS 문제일 가능성이 높습니다");
      }

      throw error;
    }
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
