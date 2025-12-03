# 현재 CORS 이슈 안내

## 문제 상황

현재 프론트엔드에서 백엔드 API와 통신 시 CORS (Cross-Origin Resource Sharing) 오류가 발생하고 있습니다.

### 발생하는 에러:
- 회원가입 시: "서버 연결에 실패했습니다. CORS 설정을 확인해주세요."
- 이미지 분석 시: "로그인이 필요한 서비스입니다. 먼저 로그인해주세요." (로그인도 CORS 오류로 불가능)

## CORS란?

CORS는 웹 브라우저의 보안 기능으로, 다른 도메인(출처)에서 오는 요청을 차단합니다.
프론트엔드(`http://localhost:3000`)와 백엔드(`https://asbestosbe-production.up.railway.app`)가 다른 도메인이므로, 백엔드에서 명시적으로 프론트엔드의 요청을 허용해야 합니다.

## 프론트엔드 상태

✅ **프론트엔드는 모든 준비가 완료되었습니다:**

1. 환경 변수 설정 완료 (`.env`, `.env.production`)
2. API 클라이언트 구성 완료 (`src/api/client.ts`)
3. 인증 API 연결 완료 (`src/api/authApi.ts`)
4. 분석 API 연결 완료 (`src/api/analysisApi.ts`)
5. 에러 핸들링 및 로깅 완료
6. JWT 토큰 자동 주입 완료

## 백엔드에서 필요한 작업

❌ **백엔드 CORS 설정이 필요합니다:**

백엔드 팀에서 다음 origins를 허용하도록 CORS 미들웨어를 설정해야 합니다:

### 허용해야 할 Origins:
- `http://localhost:3000` (개발 환경)
- `http://localhost:3001` (개발 환경)
- `http://localhost:3002` (개발 환경)
- `https://kicklani.github.io` (프로덕션 환경)

### 설정 방법:
자세한 백엔드 CORS 설정 방법은 `BACKEND_CORS_SETUP.md` 파일을 참고하세요.

## 개발자 디버깅 정보

### 브라우저 개발자 도구에서 확인 방법:

1. **개발자 도구 열기**: `F12` 또는 `Ctrl+Shift+I`
2. **Console 탭 확인**: 상세한 에러 로그 확인
3. **Network 탭 확인**:
   - 회원가입 또는 로그인 시도
   - 빨간색으로 표시된 요청 클릭
   - Headers 탭에서 다음 확인:
     - Request Headers: `Origin: http://localhost:3000`
     - Response Headers: `Access-Control-Allow-Origin`이 없거나 다른 값

### 예상되는 콘솔 로그:

회원가입 시도 시:
```
=== API Client 설정 ===
Base URL: https://asbestosbe-production.up.railway.app
Timeout: 30000

=== 회원가입 요청 ===
Base URL: https://asbestosbe-production.up.railway.app
요청 URL: /auth/signup
전체 URL: https://asbestosbe-production.up.railway.app/auth/signup
요청 데이터: {email: "...", password: "...", name: "..."}

=== 회원가입 에러 ===
에러 타입: AxiosError
에러 메시지: Network Error
네트워크 에러: 서버로부터 응답이 없습니다
이것은 CORS 문제일 가능성이 높습니다
```

## 임시 해결 방법

CORS 문제가 해결될 때까지 다음 방법으로 테스트할 수 있습니다:

### 방법 1: CORS 우회 브라우저 확장 프로그램 (개발 용도만)
- Chrome: "Allow CORS: Access-Control-Allow-Origin"
- ⚠️ 주의: 개발 테스트용으로만 사용하고, 사용 후 비활성화하세요

### 방법 2: 백엔드 로컬 실행
- 백엔드를 로컬에서 실행하고 CORS 설정 추가
- 프론트엔드 `.env` 파일에서 `VITE_API_BASE_URL=http://localhost:8080` 변경

## 진행 상황

- [x] 프론트엔드 환경 설정 완료
- [x] API 연결 코드 작성 완료
- [x] 에러 핸들링 및 로깅 추가
- [x] 백엔드 CORS 설정 가이드 작성 (`BACKEND_CORS_SETUP.md`)
- [ ] 백엔드 CORS 설정 적용 대기 중
- [ ] 회원가입 기능 테스트
- [ ] 로그인 기능 테스트
- [ ] 이미지 분석 기능 테스트

## 다음 단계

1. 백엔드 팀에 `BACKEND_CORS_SETUP.md` 전달
2. 백엔드에서 CORS 설정 적용
3. 설정 후 다음 테스트:
   - [ ] 회원가입
   - [ ] 로그인
   - [ ] 이미지 업로드 및 분석
   - [ ] 검사소 조회
   - [ ] 분석 히스토리 조회

## 연락처

프론트엔드 관련 문의사항이나 추가 정보가 필요하시면 다음 파일을 참고하세요:
- `src/api/client.ts` - API 클라이언트 설정
- `src/api/authApi.ts` - 인증 API
- `src/api/analysisApi.ts` - 분석 API
- `.env` - 개발 환경 변수
- `.env.production` - 프로덕션 환경 변수
