# Backend CORS Configuration Guide

## Issue Summary

The frontend application is experiencing CORS (Cross-Origin Resource Sharing) errors when attempting to communicate with the backend API at `https://asbestosbe-production.up.railway.app`.

### Error Messages:
- "Access to XMLHttpRequest at 'https://asbestosbe-production.up.railway.app/analysis/upload' from origin 'http://localhost:3000' has been blocked by CORS policy"
- "서버 연결에 실패했습니다. CORS 설정을 확인해주세요." (Server connection failed. Please check CORS settings.)

## What is CORS?

CORS is a security feature implemented by web browsers that restricts web pages from making requests to a different domain than the one that served the web page. The backend must explicitly allow requests from the frontend's origins.

## Required Fix

The backend needs to configure CORS to accept requests from the following origins:

### Development Origins:
- `http://localhost:3000`
- `http://localhost:3001`
- `http://localhost:3002`

### Production Origins:
- `https://kicklani.github.io`

## Backend Implementation

### For FastAPI (Python):

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "https://kicklani.github.io",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,  # Allow cookies and authentication headers
    allow_methods=["*"],     # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],     # Allow all headers
)
```

### For Express.js (Node.js):

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

// Configure CORS
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'https://kicklani.github.io'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

## Affected Endpoints

The following endpoints are currently being called from the frontend and need CORS enabled:

1. **Authentication**
   - `POST /auth/signup` - User registration
   - `POST /auth/login` - User login
   - `POST /auth/token` - Token refresh

2. **Analysis**
   - `POST /analysis/upload` - Image upload and analysis
   - `POST /analysis/additional-info` - Submit additional information
   - `GET /analysis/history` - Get user's analysis history
   - `GET /analysis/:id` - Get specific analysis result
   - `DELETE /analysis/:id` - Delete analysis record

3. **Inspection Centers**
   - `GET /inspection-centers` - Get nearby inspection centers

4. **User**
   - `GET /auth/me` - Get current user information

## Testing CORS Configuration

After implementing CORS, test with:

### Using curl:
```bash
curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type,Authorization" \
     -X OPTIONS \
     --verbose \
     https://asbestosbe-production.up.railway.app/auth/signup
```

Expected response should include:
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: POST, GET, OPTIONS, ...
Access-Control-Allow-Headers: Content-Type, Authorization, ...
Access-Control-Allow-Credentials: true
```

### Using Browser DevTools:
1. Open browser Developer Tools (F12)
2. Go to Network tab
3. Try signup or image upload
4. Check the OPTIONS preflight request
5. Verify response headers include `Access-Control-Allow-Origin`

## Current Frontend Configuration

The frontend is properly configured and ready:

- **Base URL**: `https://asbestosbe-production.up.railway.app`
- **Authentication**: JWT tokens with Bearer authentication
- **Request Headers**:
  - `Content-Type: application/json` (for JSON requests)
  - `Content-Type: multipart/form-data` (for file uploads)
  - `Authorization: Bearer <token>` (for authenticated requests)

## Important Notes

1. **Credentials**: The frontend sends `credentials: true` for authenticated requests, so the backend must set `allow_credentials=True`

2. **Wildcard Not Allowed**: When using `allow_credentials=True`, you cannot use `allow_origins=["*"]`. You must specify exact origins.

3. **Preflight Requests**: Browsers send OPTIONS requests before actual requests. Ensure OPTIONS method is allowed.

4. **Production vs Development**: Consider using environment variables to configure different origins for production and development:

```python
import os

FRONTEND_ORIGINS = os.getenv(
    "FRONTEND_ORIGINS",
    "http://localhost:3000,https://kicklani.github.io"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    # ...
)
```

## Verification Checklist

- [ ] CORS middleware installed and configured
- [ ] All frontend origins added to allowed origins list
- [ ] `allow_credentials` set to `True`
- [ ] `allow_methods` includes all required methods (GET, POST, PUT, DELETE, OPTIONS)
- [ ] `allow_headers` includes Content-Type and Authorization
- [ ] Tested with signup endpoint
- [ ] Tested with login endpoint
- [ ] Tested with image upload endpoint
- [ ] No CORS errors in browser console

## Contact

If you need any clarification or have questions about the frontend implementation, please refer to:

- Frontend API Client: `src/api/client.ts`
- Auth API: `src/api/authApi.ts`
- Analysis API: `src/api/analysisApi.ts`
- Environment Config: `.env` and `.env.production`
