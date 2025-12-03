# API 연동 테스트 가이드

백엔드 CORS 설정 완료 후, 다음 순서로 기능을 테스트하세요.

## 사전 준비

1. **개발 서버 실행**:
   ```bash
   npm run dev
   ```
   - 브라우저가 자동으로 열리며 `http://localhost:3000`에서 실행됩니다.

2. **개발자 도구 열기**:
   - `F12` 또는 `Ctrl+Shift+I` (Windows)
   - `Cmd+Option+I` (Mac)
   - Console 탭과 Network 탭을 확인하세요.

## 테스트 시나리오

### 1. 회원가입 테스트

**URL**: `http://localhost:3000/signup`

**테스트 데이터**:
- 이메일: `test@example.com`
- 비밀번호: `password123` (8자 이상)
- 이름: `테스트유저`

**예상 동작**:
1. "가입하기" 버튼 클릭
2. 로딩 스피너 표시
3. 성공 시: "회원가입이 완료되었습니다!" alert
4. 자동으로 로그인 페이지로 이동

**Console에서 확인**:
```
=== 회원가입 요청 ===
Base URL: https://asbestosbe-production.up.railway.app
요청 URL: /api/auth/signup
전체 URL: https://asbestosbe-production.up.railway.app/api/auth/signup
요청 데이터: {email: "test@example.com", password: "password123", name: "테스트유저"}
회원가입 성공: {access_token: "...", refresh_token: "...", ...}
```

**Network에서 확인**:
- Request: `POST /api/auth/signup`
- Status: `200 OK` 또는 `201 Created`
- Response Headers에 `Access-Control-Allow-Origin: http://localhost:3000` 포함

---

### 2. 로그인 테스트

**URL**: `http://localhost:3000/login`

**테스트 데이터**:
- 이메일: `test@example.com`
- 비밀번호: `password123`

**예상 동작**:
1. "로그인" 버튼 클릭
2. 로딩 스피너 표시
3. 성공 시: 자동으로 홈 페이지(`/`)로 이동
4. 우측 상단에 사용자 이름 표시

**Console에서 확인**:
```
=== 로그인 요청 ===
Base URL: https://asbestosbe-production.up.railway.app
요청 URL: /api/auth/login
전체 URL: https://asbestosbe-production.up.railway.app/api/auth/login
요청 데이터: {email: "test@example.com", password: "***"}
로그인 성공: {access_token: "...", refresh_token: "...", token_type: "bearer"}
```

**Network에서 확인**:
- Request: `POST /api/auth/login`
- Status: `200 OK`
- Response: JWT 토큰 포함

---

### 3. 로그인 없이 이용하기 테스트

**URL**: `http://localhost:3000/login`

**예상 동작**:
1. "로그인 없이 이용하기" 버튼 클릭
2. 홈 페이지로 이동
3. 분석 기능 사용 가능 (백엔드 정책에 따라 제한될 수 있음)

---

### 4. 이미지 분석 테스트 (로그인 후)

**URL**: `http://localhost:3000/analysis`

**테스트 데이터**:
- 이미지 파일: 석면이 포함된 건축 자재 사진

**예상 동작**:
1. "분석 시작" 버튼 클릭
2. 이미지 업로드 UI 표시
3. 이미지 파일 선택 또는 드래그 앤 드롭
4. "분석하기" 버튼 클릭
5. 분석 중 로딩 메시지 표시: "이미지를 분석하고 있습니다..."
6. 분석 결과 표시:
   - 석면 위험도 (안전/주의/위험)
   - 신뢰도 (%)
   - 감지된 특징
   - 권장사항

**Console에서 확인**:
```
=== 이미지 분석 시작 ===
업로드된 이미지: File {name: "...", size: ..., type: "image/jpeg"}
파일 이름: example.jpg

=== analyzeImage 함수 호출 ===
파일: File {name: "example.jpg", size: 123456, type: "image/jpeg"}
FormData 생성 완료
요청 URL: /api/analysis/upload

API 응답 성공: {data: {...}, status: 200}
응답 데이터: {result: {...}}
```

**Network에서 확인**:
- Request: `POST /api/analysis/upload`
- Request Headers:
  - `Authorization: Bearer <access_token>`
  - `Content-Type: multipart/form-data`
- Status: `200 OK`
- Response: 분석 결과 JSON

---

### 5. 추가 정보 제공 테스트

분석 결과 화면에서:

**테스트 데이터**:
- 위치: `서울특별시 강남구`
- 크기: 가로 `100`, 세로 `100`, 단위 `cm`
- 추가 이미지: 1-2장
- 비고: `옵션 - 추가 설명`

**예상 동작**:
1. "추가 정보 제공" 버튼 클릭
2. 모달 창 열림
3. 정보 입력 및 이미지 업로드
4. "제출" 버튼 클릭
5. 더 상세한 분석 결과 표시

**Network에서 확인**:
- Request: `POST /api/analysis/additional-info`
- Request Headers: `Authorization: Bearer <access_token>`
- Status: `200 OK`

---

### 6. 검사소 찾기 테스트

분석 결과 화면에서:

**예상 동작**:
1. "주변 검사소 찾기" 버튼 클릭
2. 위치 권한 요청 (허용)
3. 현재 위치 기반 검사소 목록 표시:
   - 검사소 이름
   - 주소
   - 전화번호
   - 거리

**Console에서 확인**:
```
현재 위치: {latitude: 35.1551, longitude: 128.0989}
검사소 조회 시작...
검사소 데이터: [{name: "...", address: "...", phone: "...", distance: "...km"}]
```

**Network에서 확인**:
- Request: `GET /api/inspection-centers?lat=35.1551&lng=128.0989`
- Status: `200 OK`

---

### 7. PDF 보고서 다운로드 테스트

분석 결과 화면에서:

**예상 동작**:
1. "PDF 보고서 다운로드" 버튼 클릭
2. PDF 파일 자동 다운로드
3. 파일명: `seogmyeon-bunseok-bogoseo-{timestamp}.pdf`
4. PDF 내용:
   - 분석 결과 요약
   - 감지된 특징
   - 권장사항
   - 업로드한 이미지 (2개씩 배치)
   - 주변 검사소 테이블
   - 면책 조항

**Note**: 현재 PDF는 jsPDF의 한글 폰트 미지원으로 영어 + 로마자 표기 한글로 생성됩니다.

---

### 8. 분석 히스토리 테스트

**URL**: `http://localhost:3000/history` (구현되어 있다면)

**예상 동작**:
1. 과거 분석 기록 목록 표시
2. 각 항목 클릭 시 상세 결과 보기

**Network에서 확인**:
- Request: `GET /api/analysis/history`
- Request Headers: `Authorization: Bearer <access_token>`
- Status: `200 OK`

---

## 에러 케이스 테스트

### 1. 인증 없이 분석 시도 (백엔드 정책에 따라)

**예상 동작**:
- 로그인하지 않은 상태에서 이미지 분석 시도
- 에러 메시지: "로그인이 필요한 서비스입니다. 먼저 로그인해주세요."

### 2. 잘못된 로그인 정보

**테스트 데이터**:
- 이메일: `test@example.com`
- 비밀번호: `wrongpassword`

**예상 동작**:
- 에러 메시지 표시

### 3. 중복 이메일 회원가입

**예상 동작**:
- 이미 가입된 이메일로 회원가입 시도
- 에러 메시지: "이미 가입된 이메일입니다"

### 4. 잘못된 이미지 형식

**예상 동작**:
- PDF, TXT 등 이미지가 아닌 파일 업로드 시도
- 프론트엔드에서 차단 또는 백엔드 에러 메시지

---

## 체크리스트

### CORS 설정 확인
- [ ] 회원가입 성공
- [ ] 로그인 성공
- [ ] 이미지 분석 성공
- [ ] 추가 정보 제출 성공
- [ ] 검사소 조회 성공
- [ ] PDF 다운로드 성공
- [ ] Network 탭에 CORS 에러 없음
- [ ] Console 탭에 에러 없음

### 기능 확인
- [ ] 이미지 업로드 UI 정상 작동
- [ ] 분석 결과 정상 표시
- [ ] 로딩 상태 정상 표시
- [ ] 에러 메시지 정상 표시
- [ ] 검사소 위치 정보 정상 표시
- [ ] PDF 보고서 내용 정상
- [ ] 로그인/로그아웃 정상 작동

### 토큰 관리
- [ ] 로그인 시 토큰 저장 확인 (localStorage)
- [ ] API 요청 시 토큰 자동 주입 확인 (Network → Headers → Authorization)
- [ ] 401 에러 시 자동 토큰 갱신 확인
- [ ] 로그아웃 시 토큰 삭제 확인

---

## 문제 발생 시

### CORS 에러가 여전히 발생하는 경우:

1. **백엔드 CORS 설정 재확인**:
   - `BACKEND_CORS_SETUP.md` 참고
   - Origins 목록에 현재 프론트엔드 URL 포함 여부 확인

2. **브라우저 캐시 삭제**:
   - `Ctrl+Shift+Delete` (Windows)
   - `Cmd+Shift+Delete` (Mac)
   - 캐시 및 쿠키 삭제

3. **하드 리로드**:
   - `Ctrl+F5` (Windows)
   - `Cmd+Shift+R` (Mac)

4. **브라우저 개발자 도구 확인**:
   - Network 탭 → 실패한 요청 클릭
   - Headers 탭 확인
   - Response Headers에 `Access-Control-Allow-Origin` 있는지 확인

### API 응답 에러 발생 시:

1. **Console 로그 확인**:
   - 상세한 에러 정보 출력됨
   - 에러 타입, 메시지, 응답 코드 확인

2. **Network 탭 확인**:
   - Status Code 확인 (400, 401, 403, 500 등)
   - Response 본문 확인

3. **백엔드 로그 확인**:
   - 백엔드 팀에 로그 요청
   - 요청이 백엔드까지 도달했는지 확인

---

## 추가 테스트 도구

### Postman으로 API 직접 테스트:

```
POST https://asbestosbe-production.up.railway.app/api/auth/signup
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "name": "테스트유저"
}
```

### curl로 CORS 확인:

```bash
curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type,Authorization" \
     -X OPTIONS \
     --verbose \
     https://asbestosbe-production.up.railway.app/api/auth/signup
```

---

## 성공 기준

모든 체크리스트 항목이 완료되고, 다음이 확인되면 성공입니다:

✅ 회원가입 → 로그인 → 이미지 분석 → 검사소 조회 → PDF 다운로드 전체 플로우 정상 작동
✅ Console에 CORS 에러 없음
✅ Network에 실패한 요청 없음
✅ 사용자 경험이 자연스럽고 에러 메시지가 명확함
